import './App.css'
import Items from './components/items'
import React, { useEffect, useState } from 'react'

function App() {

  //Object for sending mail
  const [records, setrecords] = useState([])
  const [toSend, settoSend] = useState({
    name: ''
  })

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:8000/get/`);  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setrecords(records);
    }
    getRecords()
    return;
  }, []);
 
  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetch('http://127.0.0.1:8000/post',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:toSend.name
      })
    })
    .then((response) => {
      if(!response.ok) {
        alert("Error occurred")
      }
    })
    .then(() => location.reload())
    .catch((error) => alert(error))
  }

  //handle input change in form fields
  const handleFormChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    settoSend({ ...toSend, [event.target.name]: event.target.value });
  }

  const itemsdata = () => {
    return records.length > 0 && records.map((values:any) => {
      return (
        <Items key={values.id} name={values.name} />
      )
    })
  }



  return (
    <>
      <div className="grid gap-[25px] lg:gap-0 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {/* ContactInfo */}

            <div className="xl:col-span-2 bg-white rounded-[20px] md:px-[50px] lg:px-[50px] xl:px-[90px] py-[30px] md:py-[60px]">
              <h1 className='text-black'>Add Items here</h1>
              <form className="space-y-[20px]" action="#" onSubmit={handleSubmit}>
                <div>
                  <div className="mt-[10px]">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter item name"
                      value={toSend.name}
                      onChange={handleFormChange}
                      required
                      className="h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none"
                    />
                  </div>
                </div>


                <div>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-black"
                  >
                    Add
                  </button>
                </div>
              </form>
              <section>
                {records && itemsdata()}
              </section>
            </div>
          </div>
          <div>
          </div>
    </>
  )
}

export default App
