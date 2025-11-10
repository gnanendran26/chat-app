package com.example.chat;

public class Message {
    private String from;
    private String text;
    private String time;
    public Message() {}
    public Message(String from, String text) { this.from = from; this.text = text; }
    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}