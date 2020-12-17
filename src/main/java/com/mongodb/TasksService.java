package com.mongodb;

import static com.mongodb.Task.KEY_ID;
import static com.mongodb.Task.KEY_DONE;
import static com.mongodb.Task.KEY_TITLE;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import java.util.ArrayList;

public enum TasksService {
    INSTANCE;

    public static final String DATABASE_NAME = "test";
    public static final String COLLECTION_NAME = "tasks";

    private final MongoCollection<Document> tasks;

    private TasksService() {
        MongoClient client = MongoClients.create();
        MongoDatabase dataBase = client.getDatabase(DATABASE_NAME);
        tasks = dataBase.getCollection(COLLECTION_NAME);
    }

    /*
     * Step-1 Add a new document in the collection 
     * hint: the filed tasks is already initialized and gives you acces to the collection
     */
    public Object create(Task task) {
        Document doc = new Document(KEY_TITLE, task.getTitle()).append(KEY_DONE, false);
        tasks.insertOne(doc);
        return true;
    }

    /*
     * Step-2 Get all Tasks from the database and map them to Task Object
     */
    public List<Task> read() {
        return new ArrayList<>();
    }

    /*
     * Step-3 Update document in the collection, you must specify a query on provided id and change the
     * done field
     * hints: 
     *  com.mongodb.client.model.Filters will help you specify your search query
     *  com.mongodb.client.model.Updates will help you specify your update query
     */
    public Task updateState(String id, boolean isDone) {
        return new Task();
    }

    /*
     * Step-4 Delete document in the collection, you must specify a query on provided id
     */
    public Object delete(String id) {
        return true;
    }

}
