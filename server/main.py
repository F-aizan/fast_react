import base64
from bson import ObjectId
from fastapi import FastAPI, File, Form, Response, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from models.model import Data
from db import connect_db
from typing_extensions import Annotated
from typing import Union
import base64

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connect to db
async def get_db_params():
    connection = connect_db()
    db = connection.get_database("projectdb")
    if connection and db is not None:
        return db
    else:
        return "connection error"
connection = connect_db()
db = connection.get_database("projectdb")
coll = db.get_collection("Blogs")


def helper_struct(obj) -> dict:
    return {
        "id": str(obj["_id"]),
        "name": obj["name"],
        "image": base64.b64encode(obj["image"])
    }



@app.get("/")
async def get_data_by_id_or_all(id: Union[str, None] = None):
    data = []
    if id is None:
        async for doc in coll.find():
            data.append(helper_struct(doc))
        return data
    record = await coll.find_one({"_id": ObjectId(id)})
    if record:
        return helper_struct(record) 
    else:
        return "no record found"
    


""" @app.post("/")
async def post_records(item: dict):
    item = jsonable_encoder(item)
    result = await coll.insert_one(item)
    if result:
        return "record inserted"
    else: 
        return "failed to insert record" """

#post with image
@app.post("/")
async def post_data(file: Annotated[bytes, File()], name: str):
    record = await coll.insert_one({
        'name': name,
        'image': file
    })
    if record:
        return "data posted"
    else:
        return "error in posting data"
    
@app.put("/")
async def update_records(id: str, obj: dict):
    if len(obj) < 1:
        return False
    record = await coll.find_one({"_id": ObjectId(id)})
    if record:
        updated_record = await coll.update_one(
            {"_id": ObjectId(id)}, {"$set": obj}
        )
    if updated_record:
        return Response("Record Updated", status_code=200)
    else:
        return Response("Error updating record", status_code=500)

@app.delete("/{id}")
async def delete_record(id: str):
    try:
        record = await coll.find_one({"_id": ObjectId(id)})
        if record:
            await coll.delete_one(record)
            return "record deleted"
    except Exception as e:
        return Response("Error in deleting record", status_code=500)
    


