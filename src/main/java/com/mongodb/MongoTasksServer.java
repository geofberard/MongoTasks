package com.mongodb;

import static spark.Spark.*;
import com.google.gson.Gson;
import spark.Filter;
import spark.Request;
import spark.Spark;

/**
 * Created by geoffreyberard on 18/11/2014.
 */
public class MongoTasksServer {

    private static final String API_CONTEXT = "/api/v1";

    public static void main(String[] args) {
        Spark.staticFiles.location("/public");
        port(8000);
        get(API_CONTEXT + "/tasks", "application/json",
                (request, response) -> TasksService.INSTANCE.read(),
                new JsonTransformer());
        
        post(API_CONTEXT + "/task", "application/json",
                (request, response) -> TasksService.INSTANCE.create(parseTask(request)),
                new JsonTransformer());

        post(API_CONTEXT + "/task/remove/:id", "application/json", 
                (request, response) -> TasksService.INSTANCE.delete(request.params(":id")),
                new JsonTransformer());

        post(API_CONTEXT + "/task/set-state/:id/:state", "application/json", 
                (request, response) -> {
                    String id = request.params(":id");
                    boolean isDone = Boolean.parseBoolean(request.params(":state"));
                    return TasksService.INSTANCE.updateState(id, isDone);
                },
                new JsonTransformer());

        after((Filter) (request, response) -> {
            response.header("Access-Control-Allow-Methods", "GET,PUT,POST");
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
            response.header("Access-Control-Allow-Credentials", "true");
        });
    }

    private static Task parseTask(Request request) {
        return new Gson().fromJson(request.body(), Task.class);
    }

}
