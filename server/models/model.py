from pydantic import BaseModel

class Data(BaseModel):
    id: int
    name: str



class UpdateData(BaseModel):
    id: int
    name: str
    