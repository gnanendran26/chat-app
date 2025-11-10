package com.example.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Controller
public class ChatController {
    private static final Set<String> onlineUsers = new HashSet<>();

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message send(Message message) {
        onlineUsers.add(message.getFrom());
        message.setTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        return message;
    }

    @MessageMapping("/online")
    @SendTo("/topic/online")
    public Set<String> online(String username) {
        onlineUsers.add(username);
        return onlineUsers;
    }
}