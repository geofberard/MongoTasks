import json
from django.shortcuts import render
from django.http import JsonResponse
from pymongo import MongoClient
from bson import ObjectId
from django.template import loader

def map_task(document):
    return {
        "id": str(document["_id"]),
        "title": document["title"],
        "done": document["done"]
    }
    
# Step-1 Add a new document in the collection 
# hint: use MongoClient().test to get database
def create(partial_task):
    db = MongoClient().test
    db.tasks.insert_one(
        {
            "title": partial_task['title'],
            "done": partial_task['done']
        })
    return True

# Step-2 Get all Tasks from the database and map them to Task Object
def read():
    db = MongoClient().test
    return list(map(map_task, db.tasks.find()))

# Step-3 Update document in the collection, you must specify a query on provided id and change the
# hint: you can use dictionnary to create queries
def update_state(id, isDone):
    db = MongoClient().test
    db.tasks.update_one({"_id": ObjectId(id)}, {'$set': {'done': isDone}})
    return True

# Step-4 Delete document in the collection, you must specify a query on provided id
def delete(id):
    db = MongoClient().test
    db.tasks.delete_one({"_id": ObjectId(id)})
    return True
