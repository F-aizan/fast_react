import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv("dbconfig.env")

def connect_db():
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("ATLAS_URI"))
        if client:
            return client
    except Exception as e:
        print(e)