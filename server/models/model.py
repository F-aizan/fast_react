from typing import Union
from pydantic import BaseModel

class Data(BaseModel):
    id: int
    name: str
    image: bytes



class UpdateData(BaseModel):
    id: int
    name: str
    image: bytes
    