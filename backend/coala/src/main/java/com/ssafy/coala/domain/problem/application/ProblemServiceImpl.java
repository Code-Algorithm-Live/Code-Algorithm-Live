package com.ssafy.coala.domain.problem.application;

import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.problem.dao.MemberProblemRepository;
import com.ssafy.coala.domain.problem.dao.ProblemRepository;
import com.ssafy.coala.domain.problem.dao.RecentMemberRepository;
import com.ssafy.coala.domain.problem.dao.CurateInfoRepository;
import com.ssafy.coala.domain.problem.domain.MemberProblem;
import com.ssafy.coala.domain.problem.domain.Problem;
import com.ssafy.coala.domain.problem.domain.CurateInfo;
import com.ssafy.coala.domain.problem.domain.Tag;
import com.ssafy.coala.domain.problem.dto.ProblemDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
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
    CurateInfoRepository curateInfoRepository;
    @Autowired
    RecentMemberRepository recentMemberRepository;

    @Override
    public List<Problem> insertProblem(List<Problem> list) {
        return problemRepository.saveAll(list);
    }

    @Override
    public Integer maxId() {
        return problemRepository.findMaxId();
    }

    @Override
    public Optional<Problem> getProblem(int id) {
        return problemRepository.findById(id);
    }

    @Override
    public void updateDescriptionById(int id, String description) {
        problemRepository.updateProblemDescription(id, description);
    }


    @Override
    @Transactional
    public CurateInfo getCurateProblem(List<Integer> problems, List<String[]> recentProblemStr, String solvedId) {
        //get solvedId
        Member member = new Member();
        member.setSolvedId(solvedId);
        member.setId(memberProblemRepository.findUUIDBySolveId(solvedId));

        //check updateTime
        CurateInfo curateInfo = curateInfoRepository.findById(solvedId).orElse(null);
        if (curateInfo != null && Duration.between(curateInfo.getLastUpdate(), LocalDateTime.now()).toSeconds()<5){
            return null;
        }

        //update MemberProblem data
        if (member.getId()==null) return null;
        updateMemberProblem(problems, recentProblemStr, member);

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
                if (recentTag.containsKey(t.getName())) continue;;
                recentTag.put(t.getName(), 1);

            }
        }

        List<Problem> rangedProblem = null;
        if (maxLV<4){
            rangedProblem = problemRepository.findProblemsByLevelRange(1, 5);
        } else {
            rangedProblem = problemRepository.findProblemsByLevelRange(maxLV-3, maxLV+1);
        }

//        sort되어있나?
        rangedProblem.sort(Comparator.comparingInt(Problem::getId));

        //이미 푼 문제 제거
        rangedProblem = rangedProblemFiltering(rangedProblem, problems);

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

        List<ProblemDto> curateProblem = new ArrayList<>();

        for (int i=0; i<Math.min(20, listPS.size()); i++){
            int idx = binarySearchProblem(rangedProblem, listPS.get(i).id);
            curateProblem.add(new ProblemDto(rangedProblem.get(idx)));
        }

        CurateInfo result = new CurateInfo(solvedId, LocalDateTime.now(), curateProblem);
        curateInfoRepository.save(result);

        //return 확인
        //re-filtering후 counting data 주기
        //친구가 푼 문제 확인
        //recentMember 갱신
        //list 구현체
        //responce보내주고 함수 실행하기
        return result;
    }

    List<Problem> rangedProblemFiltering(List<Problem> rangedProblem, List<Integer> problems){
        List<Problem> result = new ArrayList<>();

        int i=0;
        int j=0;
        while (i<problems.size() && j<rangedProblem.size()){
            if (problems.get(i)>rangedProblem.get(j).getId()){
                result.add(rangedProblem.get(j++));
            } else if (problems.get(i)<rangedProblem.get(j).getId()) {
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


        List<MemberProblem> preProblem = memberProblemRepository.selectByMemberId(member.getId());
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
