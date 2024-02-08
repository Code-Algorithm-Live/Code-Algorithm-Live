package com.ssafy.coala.domain.member.application;

import com.ssafy.coala.domain.member.dao.MemberRepository;
import com.ssafy.coala.domain.member.domain.Member;
import com.ssafy.coala.domain.member.dto.CustomUserDetails;

import com.ssafy.coala.domain.member.domain.MemberProfile;
import com.ssafy.coala.domain.member.dao.MemberProfileRepository;
import com.ssafy.coala.domain.member.dto.MemberDto;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {


    private final MemberProfileRepository memberProfileRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisStringTemplate;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Value("${file.upload.directory}")
    private String directoryPath;

    public MemberServiceImpl(MemberProfileRepository memberProfileRepository, MemberRepository memberRepository, RedisTemplate<String, String> redisStringTemplate, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberProfileRepository = memberProfileRepository;
        this.memberRepository = memberRepository;
        this.redisStringTemplate = redisStringTemplate;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public boolean check(MemberDto member) {

        return memberProfileRepository.existsByEmail(member.getEmail());
    }

    @Override
    public void signUp(MemberDto memberDto) {
        System.out.println(memberDto);
        MemberProfile memberProfile = MemberProfile.builder()
                .nickname(memberDto.getNickname())
                .kakaoname(memberDto.getKakaoname())
                .email(memberDto.getEmail())
                .solvedId(memberDto.getSolvedId())
                .imageUrl(memberDto.getImage())
                .build();

        memberProfileRepository.save(memberProfile);
        MemberProfile tmpmember = memberProfileRepository.findBySolvedId(memberDto.getSolvedId());

        System.out.println("UUID : " + tmpmember.getId());
        Member member = Member.builder()
                .id(tmpmember.getId())
                .nickname(tmpmember.getNickname())
                .email(tmpmember.getEmail())
                .solvedId(tmpmember.getSolvedId())
                .password(bCryptPasswordEncoder.encode(tmpmember.getEmail()))
                .imageUrl(tmpmember.getImageUrl())
                .build();
        memberRepository.save(member);
    }

    @Override
    public MemberProfile getMemberProfile(UUID uuid) {
        return memberProfileRepository.findById(uuid);
    }

    @Override
    public Member getMember(UUID uuid) {
        return memberRepository.findById(uuid);
    }

    @Override
    public boolean dupCheck(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public void logout() {
        //Token에서 로그인한 사용자 정보 get해 로그아웃 처리
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = customUserDetails.getMember();
        //
        if (redisStringTemplate.opsForValue().get("JWT_TOKEN:" + member.getEmail()) != null) {
            redisStringTemplate.delete("JWT_TOKEN:" + member.getEmail()); //Token 삭제
            System.out.println("로그아웃 성공");
        }
    }

    @Override
    public Member getMemberByNickname(String name) {
        return memberRepository.findByNickname(name);
    }

    @Override
    public List<Member> getMemberAllList() {
        List<Member> list = memberRepository.findAll();
        return list;
    }

    @Override
    public List<MemberDto> getMemberByProblemId(int problemId) {
        List<Object[]> objList = memberProfileRepository.findAccessMemberByProblemId(problemId);
        List<MemberDto> result = new ArrayList<>();
        for (Object[] objarr:objList){
            MemberDto memberDto = new MemberDto((String)objarr[0],(String)objarr[1],
                    (String)objarr[2],(String)objarr[3],(int)objarr[4],(String)objarr[5]);
            result.add(memberDto);
        }
        return result;
    }

    @PostConstruct
    private void mkdirs(){
        File directory = new File(directoryPath +"images");
        if (!directory.exists())
            directory.mkdirs();
    }

    @Transactional
    @Override
    public boolean saveImage(String nickname, MultipartFile image) throws IOException {
        String ImageUrl = memberProfileRepository.findImageUrlByNickname(nickname);
        if(ImageUrl!=null){
            File file = new File(ImageUrl);
            if (file.exists()){
                if (!file.delete()) return false;
            }
        }

        String filePath = directoryPath+"images/"+nickname+getFileExtension(image.getOriginalFilename());
        memberProfileRepository.updateImageUrlByNickname(filePath, nickname);
        File dest = new File(filePath);
        image.transferTo(dest);

        return true;
    }

    public Byte[] getImageByte(String nickname){
//        memberProfileRepository.findImageUrlByNickname(nickname)
        return null;
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf('.');
        if (lastIndex == -1) {
            return ""; // 파일 확장자가 없는 경우
        }
        return fileName.substring(lastIndex);
    }
}
