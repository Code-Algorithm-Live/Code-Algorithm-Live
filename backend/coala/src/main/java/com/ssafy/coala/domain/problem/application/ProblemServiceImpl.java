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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

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

    @Override
    public List<Problem> insertProblem(List<Problem> list) {
        return problemRepository.saveAll(list);
    }

    @Override
    public Integer maxId() {
        return problemRepository.findMaxId();
    }

    @Override
    public Problem getProblem(int id) {
        return problemRepository.findById(id).orElse(null);
    }

    @Override
    public void updateDescriptionById(int id, String description) {
        problemRepository.updateProblemDescription(id, description);
    }


    public List<Integer> getProblem(String solvedId){
        List<Integer> result = new ArrayList<>();
//        String solvedId = "col016";
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
//        String solvedId = "col016";
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
    @Override
    @Transactional
    public CurateInfo getCurateProblem(String solvedId) {

        List<String[]> recentProblemStr = getRecentProblem(solvedId);
        List<Integer> problemIds = getProblem(solvedId);

        Member member = Member.builder()
                .solvedId(solvedId)
                .id(memberProblemRepository.findUUIDBySolveId(solvedId))
                .build();

        //check updateTime
        CurateInfo curateInfo = customCurateInfoRepository.findById(solvedId);
        if (curateInfo != null){
            return curateInfo;
        }
        //update MemberProblem data
        if (member.getId()==null) return null;
        updateMemberProblem(problemIds, recentProblemStr, member);

        //curating
        List<Integer> recentId = new ArrayList<>();
        for (int i=0; i<Math.min(5, recentProblemStr.size()); i++){
            recentId.add(Integer.parseInt(recentProblemStr.get(i)[0]));
        }

//
//        //recentId prepare
//        if (curateInfo!=null && curateInfo.getRecentId().size() == recentId.size()){
//            boolean flag = true;
//            for (int i=0; i<recentId.size(); i++){
//                if (!curateInfo.getRecentId().contains(recentId.get(i))){
//                    flag = false;
//                    break;
//                }
//            }
//            if (flag) return null;//return old curatedata
//        }


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

        List<Problem> rangedProblem = null;
        if (maxLV<4){
            rangedProblem = problemRepository.findProblemsByLevelRange(1, 5);
        } else {
            rangedProblem = problemRepository.findProblemsByLevelRange(maxLV-3, maxLV+1);
        }

        rangedProblem = rangedProblem.
                stream().filter(x->{
                    if (x.isGive_no_rating()) return false;

                    for (ProblemLanguage language:x.getLanguages()){
                        if (language.getLanguage().equals("ko")) return true;
                    }
                    return false;
                }).
                collect(Collectors.toList());

        //        sort되어있나?
        rangedProblem.sort(Comparator.comparingInt(Problem::getId));

        //이미 푼 문제 제거
        rangedProblem = rangedProblemFiltering(rangedProblem, problemIds);

        List<ProblemSimilarity> listPS = new ArrayList<>();//유사도 리스트

        for (Problem p: rangedProblem){
            Map<String, Integer> tag = new HashMap<>();
            for (Tag t: p.getTags()){
                tag.put(t.getName(), 1);
            }
            double similarity = calculateCosineSimilarity(tag, recentTag);
            if (similarity>0) listPS.add(new ProblemSimilarity(p.getId(), similarity));

        }

        //유사도 높은 순으로 sort
        //유사도 같다면...?
        //정해진 구간에서 랜덤하게
        listPS.sort(Comparator.comparingDouble(x -> x.value));

        //filtering
        listPS = listPS.stream().
                filter(x -> x.value>0).
                collect(Collectors.toList());

        List<ProblemDto> curateFromRecent = new ArrayList<>();
        List<Integer> curateFromRecentIds = new ArrayList<>();

        for (int i=0; i<Math.min(20, listPS.size()); i++){
            int idx = binarySearchProblem(rangedProblem, listPS.get(i).id);
            curateFromRecentIds.add(idx);
            curateFromRecent.add(new ProblemDto(rangedProblem.get(idx)));
        }

        CurateInfo result = new CurateInfo();
        result.setId(solvedId);
        result.setCurateFromRecent(curateFromRecent);

        curateFromRecentIds.sort(Comparator.naturalOrder());

        //친구가 푼 문제 확인 -> 차후 구현
        //join 많이 필요.. 버리자!

        //filtering 후 counting data 주기
        rangedProblem = rangedProblemFiltering(rangedProblem, curateFromRecentIds);
        rangedProblem = rangedProblem.
                stream().filter(x -> x.getQuestion_cnt()>0).
                collect(Collectors.toList());
        rangedProblem.sort(Comparator.comparingInt(Problem::getQuestion_cnt));

        List<ProblemDto> curateFromQuestionCnt = new ArrayList<>();
        for (int i=0; i<Math.min(20, rangedProblem.size()); i++){
            curateFromQuestionCnt.add(new ProblemDto(rangedProblem.get(i)));
        }
        result.setCurateFromQuestionCnt(curateFromQuestionCnt);

        customCurateInfoRepository.saveWithTTL(result, 5);

        return result;
    }

    @Override
    public List<Integer> getProblemByMember(String solvedId) {
        return memberProblemRepository.findProblemIdBySolvedId(solvedId);
    }

    @Override
    public List<String> getSolvedIdByProblem(int problemId) {
        return memberProblemRepository.findSolveIdByProblemId(problemId);
    }

    @Override
    public List<MemberProblem> getRecentMemberProblem(int problemId) {
        return null;
    }

    List<Problem> rangedProblemFiltering(List<Problem> rangedProblem, List<Integer> ids){
        List<Problem> result = new ArrayList<>();

        int i=0;
        int j=0;
        while (i<ids.size() && j<rangedProblem.size()){
            if (ids.get(i)>rangedProblem.get(j).getId()){
                result.add(rangedProblem.get(j++));
            } else if (ids.get(i)<rangedProblem.get(j).getId()) {
                i++;
            } else {
                i++;
                j++;
            }
        }

        while (j<rangedProblem.size()){
            result.add(rangedProblem.get(j++));
        }

        return result;
    }

    public void updateMemberProblem(List<Integer> problems, List<String[]> recentProblemStr, Member member){
        //recentProblem에 있다면 save
        //problem에 있지만 preProblem에 없다면 save


        List<MemberProblem> preProblem = memberProblemRepository.findByMemberId(member.getId());
        List<MemberProblem> saveProblem = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        DB는 sort되어있나?
        preProblem.sort(Comparator.comparingInt(x -> x.getProblem().getId()));

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
                if (j<preProblem.size() && problems.get(i).equals(preProblem.get(j).getProblem().getId())){
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
        memberProblemRepository.save(saveProblem.get(0));
        memberProblemRepository.saveAll(saveProblem);
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

    public static int binarySearchProblem(List<Problem> problems, int targetId) {
        int low = 0;
        int high = problems.size() - 1;

        while (low <= high) {
            int mid = (low + high) >>> 1;
            int midId = problems.get(mid).getId();

            if (midId < targetId) {
                low = mid + 1;
            } else if (midId > targetId) {
                high = mid - 1;
            } else {
                return mid; // ID found at index mid
            }
        }

        return -1; // ID not found
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
