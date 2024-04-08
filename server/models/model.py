from typing import Union
from pydantic import BaseModel

class Item(BaseModel):
    id: int
    name: str
    price: int



class UpdateItem(BaseModel):
    id: int
    name: str
    price: int
    