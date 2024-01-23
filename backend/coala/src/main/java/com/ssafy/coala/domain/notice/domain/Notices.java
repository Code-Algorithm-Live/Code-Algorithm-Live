package com.ssafy.coala.domain.notice.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "notices")
public class Notices {
    //member id
    @Id
    private int id;
    private List<Notice> list;
    @Getter
    @Setter
    public class Notice {
        private int type;
        private String name;
        private String content;
        private LocalDateTime time;
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
