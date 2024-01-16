package com.ssafy.coala.domain.member.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

@Getter
@Setter
@Document(collection = "notices")
public class Notices {
    //member id
    @Id
    int id;
    List<Notice> list;
    @Getter
    @Setter
    public class Notice {
        int type;
        String name;
        String content;
        LocalDateTime time;
        public Notice(int type, String name, String content){
            this.type = type;
            this.name = name;
            this.content = content;
            this.time = LocalDateTime.now();
        }
    }

    public Notices(){
        list = new ArrayList<>();
    }

    public Notices(int id){
        list = new ArrayList<>();
        this.id = id;
    }

    public List<Notice> add(int type, String name, String content){
        while (list.size()>=20) list.remove(0);
        list.add(new Notice(type, name, content));
        return list;
    }
}
