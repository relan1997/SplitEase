import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Names from './pages/Names/Names'
import Transactions from './pages/Transactions/Transactions'
import Result from './pages/Result/Result'
function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='names' element={<Names/>}></Route>
        <Route path='transactions' element={<Transactions/>}></Route>
        <Route path="result" element={<Result/>}></Route>
      </Routes>
    </div>
  )
}

export default App
