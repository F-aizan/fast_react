import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {


  const [itemName, setItemname] = useState('')
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
      async function getRecords() {
        const recordid = params.id?.toString()
        console.log(recordid)
        const response = await fetch(`http://localhost:8000/?id=${recordid}`);  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return  (
              <h1>Unable to fetch Records</h1>
          );
        }
    
        const data = await response.json();
        setItemname(data.name)

      }
      getRecords()
      return;
    }, []);


    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata= new FormData()
        const imagedata:any = document.querySelector('input[type="file"]');
        if (imagedata){
          formdata.append("itemImage",imagedata.files[0])
        }
        const recordid = params.id?.toString()
        await fetch(`http://127.0.0.1:8000/?id=${recordid}&itemname=${itemName}`,{
          method:'PUT',
          body:formdata
        })
        .then((response) => {
          if(!response.ok) {
            alert("Error occurred")
          }
          navigate('/')
        })
        .catch((error) => alert(error))
      }
    
      //handle input change in form fields
      const handleFormChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name == 'name'){
          setItemname(event.target.value)
        }
      }
    
    return (
        <>
            <div className="grid gap-[25px] lg:gap-0 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {/* ContactInfo */}

                <div className="xl:col-span-2 bg-white rounded-[20px] md:px-[50px] lg:px-[50px] xl:px-[90px] py-[30px] md:py-[60px]">
                <h1 className='text-black'>Edit Items Here</h1>
                <form className="space-y-[20px]" action="#" onSubmit={handleSubmit}>
                    <div>
                      <div className="mt-[10px]">
                          <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter item name"
                          value={itemName}
                          onChange={handleFormChange}
                          required
                          className="h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none"
                          />
                      </div>
                    </div> 
                    <div className="flex flex-row justify-between text-black">
                      <label
                      htmlFor="fileupload"
                      className="text-black"
                      >
                        Choose Image
                      </label>
                      <div className="mt-[10px]">
                        <input
                          id="fileupload"
                          name="fileupload"
                          type="file"
                          onChange={handleFormChange}
                          required
                          className="h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none"
                        />
                      </div>
                    </div> 
                    <div>
                    <button
                        type="submit"
                        className="bg-blue-400 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-black"
                    >
                        Update
                    </button>
                    </div>
                </form>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}

export default Edit