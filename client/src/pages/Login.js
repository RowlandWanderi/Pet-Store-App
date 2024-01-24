import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'

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

      <div className='col-md-4 mt-5 card pt-3 pb-4 px-3'>
        <h3 className='text-center mt-4'>Login</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input value={username} onChange={ e => setUsername(e.target.value)} type="text" className="form-control" />
        </div>
       
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password"  value={password} onChange={ e => setPassword(e.target.value)} className="form-control"/>
        </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        <div className="mb-3">
          <h6>
            Don't have an account?
            <NavLink className="nav-link active" aria-current="page" to="/register">
              Sign Up
            </NavLink>
          </h6>
        </div>
        </form>
      </div>

      <div className='col-md-4'></div>
    </div>
  )
}