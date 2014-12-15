package com.mongodb;

import org.bson.Document;

/**
 * Created by geoffreyberard on 15/12/2014.
 */
public class Task {

    public static final String KEY_ID = "_id";
    public static final String KEY_TITLE = "title";
    public static final String KEY_DONE = "done";

    private String id;
    private String title;
    private boolean done;

    public Task(){
        this.id = "";
        this.title = "";
        this.done = false;
    }

    public Task(String id, String title, boolean done) {
        this.id = id;
        this.title = title;
        this.done = done;
    }

    public Task(Document document) {
        this(
            document.getObjectId(KEY_ID).toString(),
            document.getString(KEY_TITLE),
            document.getBoolean(KEY_DONE)
        );
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }
}
