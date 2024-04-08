import { useEffect, useState } from "react";
import { Link } from "react-router-dom"



const Records = () => {

      const [records, setrecords] = useState([])
      const [loading, setloading] = useState(false)

      useEffect(() => {
        async function getRecords() {
          setloading(true)
          const response = await fetch(`http://localhost:8000/`);  
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return  (
                <h1>Unable to fetch Records</h1>
            );
          }
          setloading(false)
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
        {!loading && records.length == 0 && <h1>No Items to display</h1>}
        <div className="grid grid-cols-3 gap-10 text-black rounded-[20px]">    
          {records.map((item: any) => (
            <div className="flex flex-col justify-between bg-white px-10 py-10 rounded-[20px]" key={item.id}>
              {item.name}
               <img src={`data:image/png;base64,${item.image}`} className="rounded-[20px]" loading="lazy" alt="image" /> 
              <div className="flex flex-row justify-around">
                <Link to={`/edit/${item.id}`}>
                  <button className="text-white">Edit</button>
                </Link>
                <button className="text-white" onClick={() => deleteRecord(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          {loading && <h1 className="text-white w-full text-center">Loading Items......</h1>}
        </div>
      </>
      
        
    )
}

export default Records