import { FunctionComponent, useEffect, useState} from "react"
import { useParams } from "react-router"

type Dataprops = {
    id: string,
    name: string,
    deleteRecords: (obj: any) => any
}


const Items: FunctionComponent<Dataprops> = ({
    id,
    name,
    deleteRecords
}) => {

    const [records, setrecords]  = useState([])

    useEffect(() => {
        let fetchrecords = async() => {
            const response = await fetch("http://127.0.0.1:8000/get")
            const data = await response.json()
            if (!response.ok) {
                alert("error occurred")
            }
            setrecords(data)
        }
        fetchrecords()

    }, [])

    const deleteRecord = async(recordid: any) => {
        const response = await fetch(`http://127.0.0.1:8000/delete/${recordid}`, {
            method:"DELETE"
        })
        if(!response.ok){
            alert("Error occurred")
            console.log(recordid)
        }
        else alert("record deleted")
        console.log(recordid)
    }


    return (
        
        <tr className="text-black">
            <td>{name}</td>
            <td>
                <a>Edit</a> |
                <button 
                className="text-white"
                onClick={() => deleteRecord(records)}>Delete</button>
            </td>
        </tr>
    )
}

export default Items