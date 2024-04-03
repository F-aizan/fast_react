import { FunctionComponent, useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Dataprops = {
    name: string,
    image: string,
    deleteRecords: (obj: any) => any,
    records: any
  }
  {/*

  const Items: FunctionComponent<Dataprops> = ({
    name,
    image,
    deleteRecords,
    records
  }) => {
  
    return (
        
        <tr className="flex flex-column justify-between">
            <td className="text-black">{name}</td>
            <img src={image} alt="image" />
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
  const itemsdata = () => {
    return records.length > 0 && records.map((values:any) => {
      return (
        <Items image={values.image} records={records} key={values.id} name={values.name} deleteRecords={() => deleteRecord(values.id)}/>
      )
    })
  }*/}

const Records = () => {

      const [records, setrecords] = useState([])

      useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:8000/`);  
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
        const response = await fetch(`http://127.0.0.1:8000/${recordid}`, {
            method:"DELETE"
        })
        if(!response.ok){
            alert("Error occurred")
            console.log(recordid)
        }
        location.reload()
        console.log(recordid)
    }
    
      
      
    return(
      <>
        {
          records.length > 0 && <div>
          <h1>Your Items</h1>
        </div>
        }

        <div className="grid grid-cols-3 gap-10 text-black rounded-[20px]">    
          {records.map((item: any) => (
            <div className="flex flex-col justify-between bg-white px-10 py-10 rounded-[20px]" key={item.id}>
              {item.name}
               <img src={`data:image/png;base64,${item.image}`} alt="image" /> 
              {/* <p>{`data:text/plain;base64,${item.image}`}</p>  */}
              {/* {console.log(item.image)} */}
              <div className="flex flex-row justify-around">
                <Link to={`/edit/${item.id}`}>
                  <button className="text-white">Edit</button>
                </Link>
                <button className="text-white" onClick={() => deleteRecord(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          {records.length == 0 && <h1 className="text-center text-white">No Items to display</h1>}
        </div>
      </>
      
        
    )
}

export default Records