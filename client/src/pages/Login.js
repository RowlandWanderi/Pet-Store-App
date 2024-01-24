import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom'

export default function Login() 
{
  const {login} = useContext(UserContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()


  const handleSubmit = (event)=>{
    event.preventDefault()

    login(username, password)
    
    setUsername("")
    setPassword("")
  }
  
  return (
    <div className='container row'>
      <div className='col-md-4'></div>

      <div className='col-md-4 mt-5 card pt-3 pb-4 px-3 card border-info'>
        <h6 className='text-center mt-4'>Log into your account!</h6>
        <br/>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input placeholder='Username' value={username} onChange={ e => setUsername(e.target.value)} type="text" className="form-control" />
        </div>
       <br/>
        <div className="mb-3">
          <input placeholder='Password' type="password"  value={password} onChange={ e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <br/>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="mb-3 login-link">
          <p className='mx-5'>
            Don't have an account?
            <NavLink className="nav-link active" aria-current="page" to="/register">
             <span className='text-primary mx-5'>Sign Up</span> 
            </NavLink>
          </p>
        </div>
        </form>
      </div>

      <div className='col-md-4'></div>
    </div>
  )
}