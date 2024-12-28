import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <div>Home</div>
        <Link to="/login">Login</Link>
        <Link to='/register'>Register</Link>
    </> 
  )
}

export default Home