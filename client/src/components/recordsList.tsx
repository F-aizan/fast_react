import { FunctionComponent, useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Dataprops = {
    name: string,
    deleteRecords: (obj: any) => any,
    records: any
  }

  const Items: FunctionComponent<Dataprops> = ({
    name,
    deleteRecords,
    records
  }) => {
  
    return (
        
        <tr className="flex flex-row justify-between">
            <td className="text-black">{name}</td>
            <td>
                <Link to={`/edit/${records.id}`}>Edit </Link> 
                <span className="font-bold text-black">|</span>
                <button 
                className="text-white"
                onClick={() => deleteRecords(records.id)}>Delete</button>
            </td>
        </tr>
    )
  }

const Records = () => {

      const [records, setrecords] = useState([])

      useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:8000/get`);  
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return  (
                <h1>Unable to fetch Records</h1>
            );
          }
      
          const records = await response.json();
          setrecords(records);
        }
        getRecords()
        return;
      }, []);

      const deleteRecord = async(recordid: any) => {
        const response = await fetch(`http://127.0.0.1:8000/delete/${recordid}`, {
            method:"DELETE"
        })
        if(!response.ok){
            alert("Error occurred")
            console.log(recordid)
        }
        else {
            console.log(recordid)
            alert("record deleted")
        }
        location.reload()
        console.log(recordid)
    }
    
      const itemsdata = () => {
        return records.length > 0 && records.map((values:any) => {
          return (
            <Items records={records} key={values.id} name={values.name} deleteRecords={() => deleteRecord(values.id)}/>
          )
        })
      }
      
    return(
      <div className="bg-[url('./assets/image.jpg')] bg-cover bg-white text-black rounded-[20px] px-20 py-20">
        <h1>Items: {records.length}</h1>
        {records.map((item: any) => (
          <p key={item.id}>
            {item.name}
            <Link to={`/edit/${item.id}`}>
              <button className="text-white">Edit</button>
            </Link>
            <button className="text-white" onClick={() => deleteRecord(item.id)}>Delete</button>
          </p>
        ))}
      </div>
        
    )
}

export default Records