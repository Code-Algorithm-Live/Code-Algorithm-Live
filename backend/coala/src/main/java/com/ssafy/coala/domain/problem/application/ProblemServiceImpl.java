package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.member.dao.MemberRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.dao.CustomCurateInfoRepository;
import com.ssafy.coala.domain.problem.dao.MemberProblemRepository;
import com.ssafy.coala.domain.problem.dao.ProblemRepository;
import com.ssafy.coala.domain.problem.domain.*;
import com.ssafy.coala.domain.problem.dto.ProblemDto;
import lombok.AllArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProblemServiceImpl implements ProblemService {
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    MemberProblemRepository memberProblemRepository;
    @Autowired
    CustomCurateInfoRepository customCurateInfoRepository;
    @Autowired
    MemberRepository memberRepository;

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public void insertProblem(List<Problem> list) {
        list.sort(Comparator.comparingInt(Problem::getId));


        Map<String, ProblemInfo>[] mapArr = (Map<String, ProblemInfo>[])new Map[31];
        for (int i=1; i<=30; i++){
            mapArr[i] = (Map) redisTemplate.opsForHash().entries("level:"+i);
            if (mapArr[i]==null) mapArr[i] = new LinkedHashMap();
        }

        List<Integer> ids = new ArrayList<>();
        for (Problem p : list){
            ids.add(p.getId());
        }
        //난이도 없는 문제 풀면?
//        List<Integer> question_cnt = problemRepository.findAllQuestionCntById(ids);
//        for (int i =0; i<list.size(); i++){
//            if (question_cnt.get(i)!=null) list.get(i).setQuestion_cnt(question_cnt.get(i));
//        }

        for (Problem p:list){
            if (p.getLevel()==0) continue;
            for (ProblemLanguage pl:p.getLanguages()){
                if (pl.getLanguage().equals("ko")) {
//                    System.out.println(pl.getLanguage()+":"+p.getLanguages().size());
                    mapArr[p.getLevel()].put(p.getId().toString(), new ProblemInfo(p));
                    break;
                }
            }
        }

        for (int i=1; i<=30; i++){
            redisTemplate.opsForHash().putAll("level:"+i, mapArr[i]);
            Map<Object, Object> map = redisTemplate.opsForHash().entries("level:"+i);
        }
        redisTemplate.opsForValue().set("curId:" ,list.get(list.size()-1).getId());

        problemRepository.saveAll(list);
    }

    @Override
    public Integer curId() {
        Integer id = (Integer) redisTemplate.opsForValue().get("curId:");
        return (id==null)?999:id;
    }

    @Override
    public void questionCntIncrease(int id){
        Problem p = getProblem(id);
        if (p==null) return;
        p.setQuestion_cnt(p.getQuestion_cnt()+1);
        redisTemplate.opsForHash().put("level:"+p.getLevel(), p.getId().toString(),
                new ProblemInfo(p));
        problemRepository.questionCntIncrease(p.getId());

    }
    @Override
    public Problem getProblem(int id) {
        return problemRepository.findById(id).orElse(null);
    }

    @Override
    public void updateDescriptionById(int id, String description) {
        problemRepository.updateProblemDescription(id, description);
    }

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public List<Integer> getProblem(String solvedId){
        List<Integer> result = new ArrayList<>();
        String URL = "https://www.acmicpc.net/user/"+solvedId;
        try {
            Document doc = Jsoup.connect(URL).get();
            String[] id_arr = doc.select(".problem-list").get(0).text().split(" ");

            for (String id : id_arr){
                if (!id.isEmpty()){
                    result.add(Integer.parseInt(id));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return result;
    }
    public List<String[]> getRecentProblem(String solvedId) {
        List<String[]> result = new ArrayList<>();
        try {
            String URL = "https://www.acmicpc.net/status?problem_id=&user_id="
                    + solvedId + "&language_id=-1&result_id=4";

            Document doc = Jsoup.connect(URL).get();

            Elements idElem = doc.select(".problem_title");
            Elements timeElem = doc.select(".real-time-update");

            for (int i = 0; i < idElem.size(); i++) {
                String problemId = idElem.get(i).text();

                boolean flag = false;
                for (String[] elem : result) {
                    if (elem[0].equals(problemId)) {
                        flag = true;
                        break;
                    }
                }

                if (flag) continue;
                result.add(new String[]{problemId, timeElem.get(i).attr("title")});
            }
        } catch(IOException e){
            throw new RuntimeException(e);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public CurateInfo getCurateProblem(String solvedId) {

        //check updateTime
        CurateInfo curateInfo = customCurateInfoRepository.findById(solvedId);
        if (curateInfo != null){
//            System.out.println("not null");
            return curateInfo;
        }

        List<String[]> recentProblemStr = getRecentProblem(solvedId);
        List<Integer> problemIds = getProblem(solvedId);
        Member member = memberRepository.findBySolvedId(solvedId);
        //update MemberProblem data
        if (member.getId()==null) return null;
        updateMemberProblem(problemIds, recentProblemStr, member);

        //curating
        List<Integer> recentId = new ArrayList<>();
        for (int i=0; i<Math.min(5, recentProblemStr.size()); i++){
            recentId.add(Integer.parseInt(recentProblemStr.get(i)[0]));
        }

        List<Problem> recentProblem = problemRepository.findAllById(recentId);

        int maxLV = 0;

        Map<String, Integer> recentTag = new HashMap<>();
        for (Problem p: recentProblem){
            maxLV = Math.max(maxLV, p.getLevel());
            for (Tag t:p.getTags()){
                if (recentTag.containsKey(t.getName())) {
                    recentTag.put(t.getName(), recentTag.get(t.getName())+1);
                } else recentTag.put(t.getName(), 1);
            }
        }

        Map<Integer, ProblemInfo>[] rangedProblemArr = new Map[31];
        int low = 1;
        int high = 5;
        if (maxLV>4){
            low = maxLV-3;
            high = Math.min(maxLV+1, 30);
        }

        for (int i=low; i<=high; i++){
            rangedProblemArr[i] = new LinkedHashMap<>();

            Map<Object, Object> map = redisTemplate.opsForHash().entries("level:"+i);
            if (map==null) return new CurateInfo(solvedId, new ArrayList<>(), new ArrayList<>());
            for (Map.Entry<Object, Object> entry:map.entrySet()){
                int key = Integer.parseInt((String)entry.getKey());
                if (problemIds.contains(key)) continue;
                rangedProblemArr[i].put(key,(ProblemInfo) entry.getValue());
            }
        }

        //유사도 추천
        List<ProblemSimilarity> listPS = new ArrayList<>();//유사도 리스트

        for (int i=low; i<=high; i++){
            for (Map.Entry<Integer, ProblemInfo> entry:rangedProblemArr[i].entrySet()){
                Map<String, Integer> tag = new HashMap<>();
                for (String tagName: entry.getValue().getTags()){
                    tag.put(tagName, 1);
                }
                double similarity = calculateCosineSimilarity(tag, recentTag);
                if (similarity>0) listPS.add(new ProblemSimilarity(entry.getKey(), similarity));
            }

        }

        //유사도 높은 순으로 sort
        //유사도 같다면...?
        //정해진 구간에서 랜덤하게
        listPS.sort(Comparator.comparingDouble(x -> x.value));

        List<ProblemDto> curateFromRecentDto = new ArrayList<>();
        List<Integer> curateFromRecentIds = new ArrayList<>();

        //
        for (int i=0; i<Math.min(20, listPS.size()); i++){
            curateFromRecentIds.add(listPS.get(i).id);
        }

        List<Problem> curateFromRecent = problemRepository.findAllById(curateFromRecentIds);
        for (Problem p:curateFromRecent){
            curateFromRecentDto.add(new ProblemDto(p));
        }
        CurateInfo result = new CurateInfo();
        result.setId(solvedId);
        result.setCurateFromRecent(curateFromRecentDto);

        //친구가 푼 문제 확인 -> 차후 구현
        //join 많이 필요.. 버리자!
        //filtering 후 counting data 주기
        for (int ids: curateFromRecentIds){
            for (int i=low; i<=high; i++){
                if (rangedProblemArr[i].remove(ids)!=null) break;;
            }
        }
        List<Integer[]> questionCntList = new ArrayList<>();
        for (int i=low; i<=high; i++){
            for (Map.Entry<Integer, ProblemInfo> entry:rangedProblemArr[i].entrySet()){
                if (entry.getValue().getQuestionCnt()>0){
                    questionCntList.add(new Integer[]{entry.getKey(), entry.getValue().getQuestionCnt()});
                }
            }
        }

        questionCntList.sort(Comparator.comparingInt(x->-x[1]));
        List<Integer> questionCntListIds = new ArrayList<>();
        for (Integer[] arr:questionCntList){
            questionCntListIds.add(arr[0]);
        }

        List<Problem> curateFromQuestionCnt = problemRepository.findAllById(questionCntListIds);

        List<ProblemDto> curateFromQuestionCntDto = new ArrayList<>();
        for (Problem p: curateFromQuestionCnt){
            curateFromQuestionCntDto.add(new ProblemDto(p));
        }

        result.setCurateFromQuestionCnt(curateFromQuestionCntDto);
        customCurateInfoRepository.saveWithTTL(result, 5);

        return result;
    }


    @Override
    public List<Integer> getProblemByMember(String solvedId) {
        return memberProblemRepository.findProblemIdBySolvedId(solvedId);
    }

//    @Override
//    public List<String> getSolvedIdByProblem(int problemId) {
//        return memberProblemRepository.findSolveIdByProblemId(problemId);
//    }

//    @Override
//    public List<String> getRecentMemberByProblem(int problemId) {
//        return memberProblemRepository.findRecentNickNameByProblemId(problemId);
//    }

    public void updateMemberProblem(List<Integer> problems, List<String[]> recentProblemStr, Member member){
        long start = System.currentTimeMillis();
        //recentProblem에 있다면 save
        //problem에 있지만 preProblem에 없다면 save
        List<Integer> preProblem = memberProblemRepository.findProblemIdBySolvedId(member.getSolvedId());
        List<MemberProblem> saveProblem = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        DB는 sort되어있나?
        preProblem.sort(Comparator.comparingInt(x -> x));

//        System.out.println(System.currentTimeMillis()-start);
        //문제 데이터 갱신하기
        if (preProblem.isEmpty()){ //계정에 문제 데이터 없다면...
            for (Integer id : problems) {
                Problem newP = new Problem();
                newP.setId(id);
                MemberProblem newMP = new MemberProblem(newP, member);
                saveProblem.add(newMP);
            }

            for (String[] idStr : recentProblemStr) {
                int id = Integer.parseInt(idStr[0]);
                int idx = binarySearch(saveProblem, id);
                if (idx < 0) { //크롤링 데이터 불일치
                    idx = -idx - 1;
                    Problem newP = new Problem();
                    newP.setId(id);
                    MemberProblem newMP = new MemberProblem(newP, member,
                            LocalDateTime.parse(idStr[1], formatter));
                    saveProblem.add(idx, newMP);
                } else {
                    saveProblem.get(idx).setLastSolved(LocalDateTime.parse(idStr[1], formatter));
                }
            }
        } else {
            for (int i=0, j=0; i<problems.size(); i++){
                if (j<preProblem.size() && problems.get(i).equals(preProblem.get(j))){
                    j++;
                } else {
                    Problem newP = new Problem();
                    newP.setId(problems.get(i));
                    MemberProblem newMP = new MemberProblem(newP, member);
                    saveProblem.add(newMP);
                }
            }

            for (String[] idStr : recentProblemStr) {
                int id = Integer.parseInt(idStr[0]);
                int idx = binarySearch(saveProblem, id);
                if (idx < 0) { //크롤링 불일치 + 이미 풀었던 문제
                    idx = -idx - 1;
                    Problem newP = new Problem();
                    newP.setId(id);
                    MemberProblem newMP = new MemberProblem(newP, member,
                            LocalDateTime.parse(idStr[1], formatter));
                    saveProblem.add(idx, newMP);
                } else {
                    saveProblem.get(idx).setLastSolved(LocalDateTime.parse(idStr[1], formatter));
                }
            }
        }
//        System.out.println(System.currentTimeMillis()-start);

        //1초 걸림
        memberProblemRepository.saveAll(saveProblem);
//        System.out.println(System.currentTimeMillis()-start);
        //save시 최악의 경우 맞은문제 10문제당 1초정도 걸리는것 같다...
        //문제수가 많을경우 100문제당 4초정도로 나아지나?
    }

    public static double calculateCosineSimilarity(Map<String, Integer> vectorA, Map<String, Integer> vectorB) {
        double dotProduct = 0;
        double magnitudeA = 0;
        double magnitudeB = 0;

        // Iterate over the keys in both vectors
        for (String key : vectorA.keySet()) {
            if (vectorB.containsKey(key)) {
                // Calculate dot product
                dotProduct += vectorA.get(key) * vectorB.get(key);
            }
            // Calculate magnitude of vector A
            magnitudeA += Math.pow(vectorA.get(key), 2);
        }

        // Calculate magnitude of vector B
        for (int value : vectorB.values()) {
            magnitudeB += Math.pow(value, 2);
        }

        // Calculate cosine similarity
        if (magnitudeA == 0 || magnitudeB == 0) {
            return 0; // To handle division by zero
        } else {
            return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
        }
    }

    public static int binarySearch(List<MemberProblem> list, int key) {
        int low = 0;
        int high = list.size() - 1;

        while (low <= high) {
            int mid = (low + high) >>> 1;
            int midVal = list.get(mid).getProblem().getId();

            if (midVal < key) {
                low = mid + 1;
            } else if (midVal > key) {
                high = mid - 1;
            } else {
                return mid; // Key found
            }
        }

        // Key not found, calculate insertion point
        return -(low + 1);
    }

    @AllArgsConstructor
    public static class ProblemSimilarity{
        public int id;
        public double value;
    }
}
