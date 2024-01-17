import com.ssafy.coala.domain.chat.dto.ChatRoomDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

//    private final ChatRoomRepository chatRoomRepository;
//    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/room")
    public String rooms() {
        return "/chat/room";
    }

    @Operation(summary = "채팅방 생성", description = "도움을 요청할 때 채팅방이 생성된다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 채팅방을 만드는 것 => 도움을 요청할 때 생성
    // 상대방과 내가 들어가면 1:1, 일단은 1:1로 설계를 하고 여러명 채팅방은 나중에 설계해보자
    @PostMapping("/create")
    public ResponseEntity<ChatRoomDto> createRoom(@RequestParam String name){
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        return new ResponseEntity<ChatRoomDto>(chatRoomDto, HttpStatus.OK);
    }

    @Operation(summary = "채팅방 입장~", description = "사용자 2명이 채팅방에 입장한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    // 채팅방 입장~
    @GetMapping("/enter/{roomId}")
    public ResponseEntity<ChatRoomDto> enterRoom(@PathVariable String roomId){
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        return new ResponseEntity<ChatRoomDto>(chatRoomDto, HttpStatus.OK);
    }

    // 채팅방 나가기
//    @PostMapping("/out/{roomId}")
}
