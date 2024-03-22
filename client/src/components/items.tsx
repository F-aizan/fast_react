import { FunctionComponent, useState } from "react"
import { useParams } from "react-router"

type Dataprops = {
    name: string
}


const Items: FunctionComponent<Dataprops> = ({
    name
}) => {

    const params = useParams()

    const deleteRecord = async() => {
        await fetch(`http://127.0.0.1:8000/delete/${params.id?.toString()}`, {
            method:"DELETE"
        })
        .then((response) => {
            if(!response.ok){
                alert("Error occurred")
            }
            alert("record deleted")
        })
        .catch((error) => console.error(error))
        
    }


    return (
        <div className="flex flex-row justify-around flex-wrap text-black">
            <pre>{name}</pre>
            <a href="#">Edit</a>
            <button className="text-white" onClick={deleteRecord}>Delete</button>
        </div>
    )
}

export default Items