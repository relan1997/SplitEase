import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App
