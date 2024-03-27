import './App.css'
import Edit from './components/Editrecord'
import { Create } from './components/createRecord'
import Records from './components/recordsList'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'



function App() {
  return(
    <>
    <div>
    <Navbar />
    </div>
    <div>
      <Routes>
        <Route path='/' element={<Records />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </div>
    </>
  )
}

export default App