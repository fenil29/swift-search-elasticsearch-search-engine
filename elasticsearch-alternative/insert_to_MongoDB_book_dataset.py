
import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['books_db']
collection_books = db['books']

with open(r'F:\Dataset\books.json\books.json') as f:
    counter=0    
    for line in f:
        if(counter<=10000000):
            collection_books.insert_one(json.loads(line))
        else:
            break
        counter+=1

client.close()

