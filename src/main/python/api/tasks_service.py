import json
from django.shortcuts import render
from django.http import JsonResponse
from pymongo import MongoClient
from bson import ObjectId
from django.template import loader

# Step-1 Add a new document in the collection 
# hint: use MongoClient().test to get database
def create(partial_task):
    return True

# Step-2 Get all Tasks from the database and map them to Task Object
def read():
    return []

# Step-3 Update document in the collection, you must specify a query on provided id and change the
# hint: you can use dictionnary to create queries
def update_state(id, isDone):
    return True

# Step-4 Delete document in the collection, you must specify a query on provided id
def delete(id):
    return True
