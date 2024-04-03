from enum import Enum
from typing import Union, List
from uuid import UUID
from fastapi import Body, FastAPI, Form, Query, Path, Cookie, Header, File, UploadFile
from typing_extensions import Annotated
from urllib.parse import unquote
from datetime import datetime

from pydantic import BaseModel, Field


myapp = FastAPI()

items = {
    "foo": {"id": 1, "name": "item1", "price": [1,2,3]}
}
class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

class Item(BaseModel):
    id: int = Field(title="id", description="id of the item")
    name: str = Field(title="name", description="name of the item", max_length=30)
    prices: list = []

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "name": "name1",
                    "prices": [1, 3, 4]
                }
            ]
        }
    }

@myapp.get("/")
def get_all():
    return {"id": "current item"}

@myapp.get("/{id}")
def get_id(items: ModelName):
    if items.alexnet:
        return {"name": items.alexnet}


# path parameters 
@myapp.get("/file/{file_path: path}")
def get_file_path(file_path: str):
    return {"path": unquote(unquote(file_path))}

# query parameters 
@myapp.get("/query/")
def get_query_params(query: int):
    return {"query": query}

# both query and path params
@myapp.get("/query/{path}/")
def get_by_both(path: str, id: int):
    return {"params": str(id) + path}

#post body
@myapp.post("/")
def post_data(item: Item):
    return str(item.id) + item.name

#request body with path parameters
@myapp.post("/path/{path}")
def path_with_body_params(item: Item, path: str):
    return {"params": {"path": path, "item": item}}

#request body with path and query parameters
@myapp.post("/queryandpath/{path}")
def params_with_query_body_path(item: Item, path: str, id: int):
    return {"data": {"item": item, "path": path, "id": id}}

#query parameters with annotated
@myapp.get("/querywannotated/")
def params_with_query_annotated(q: Annotated[str, Query(min_length=2, max_length=10)] = None):
    return {"query": q}

#query parameters with annotated and regular expressions
@myapp.get("/querywannotated/")
def params_with_query_annotated_with_regex(q: Annotated[str, Query(min_length=2, max_length=10, regex="^q")] = None):
    print(q)
    return {"query": q}

#query parameters with annotated and ellipsis to declare value required
@myapp.get("/querywannotatedwithellipsis/")
def params_with_query_annotated_with_ellipsis(q: Annotated[str, Query(default=..., min_length=2, max_length=10)]):
    return {"query": q}

#query parameters with list/multiple values
@myapp.get('/querywithlists/')
def params_with_lists(q: Annotated[Union[List[int], None], Query()] = None):
    return {"query": q}

#query parameters with list/multiple values and default values
@myapp.get('/querywithlistsanddefaults/')
def params_with_lists_with_defaultvalues(q: Annotated[Union[List[str], None], Query()] = ["i1", "i2"]):
    return {"query": q}

#query parameters with list/multiple values and metadata
@myapp.get('/querywithlistsandmetadata/')
def params_with_lists_with_metadata(q: Annotated[Union[List[str], None], Query(title="listtitle", description="data items")]):
    return {"query": q}

#path parameters with metadata
@myapp.get("/pathparamswmetadata/{id}")
def pathparams_with_metadata(id: Annotated[Union[str, None], Path(title="id", description="ID of item")]):
    return {"pathparam": id}

#path parameters with number validations
@myapp.get("/pathparamswnumvalidations/{id}")
def pathparams_with_metadata_and_numbervalidations(id: Annotated[Union[int, None], Path(title="id", description="ID of item", gt=1, lt=10)]):
    return {"pathparam": id}

#body with model and singular values
@myapp.post("/bodysingularvaluesmodel/{id}")
def body_with_model_and_singular_values(item: Item, importance: Annotated[str, Body()]):
    return {"data": {"item": item, "importance": importance}}

#body with Body embed
@myapp.post("/bodysingularvalues/{id}")
def body_with_singular_values(item: Item, data:Annotated[Item, Body(embed=True)]):
    return {"data": {"item": item, "data":data}}

#params with uuid 
@myapp.get("/uuid/{id}")
def get_by_uuid(id: Union[UUID, None]=None):
    return {"id": id}

#path with cookies
@myapp.get("/cookies/")
def get_cookies(data: Annotated[Union[str, None], Cookie()]):
    return {"data": data}

#path with header
@myapp.get("/headers/")
def get_headers(data: Annotated[Union[List[str], None], Header()] = None):
    return {"headers": data}

#include and exclude response models
@myapp.get("/includeandexclude/", response_model=Item, response_model_exclude=("price"), response_model_include=("name", "id"))
def get_inc_and_exc(id: str):
    return items[id]

# parameters from form
@myapp.post("/formparmas")
def get_form_params(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    return {"data": {"username": username, "password": password}}

# files and upload files
@myapp.post("/files")
def create_file(file: Annotated[bytes, File()]):
    return {"file": str(file)}

#upload files
@myapp.post("/uploadfile")
async def upload_files(file: UploadFile):
    return {"filename": str(file.content_type)}