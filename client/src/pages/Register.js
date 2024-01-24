import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom'

export default function Register() {

  const {addUser} = useContext(UserContext)

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phone_number, setPhone_number] = useState()


  const handleSubmit = (event)=>{
    event.preventDefault()

    addUser(username, email, phone_number, password)
     
    console.log(username, email, phone_number, password);
    
    setUsername("")
    setEmail("")
    setPassword("")
    setPhone_number("")
  }

  return (
  <div className='container row'>
    <div className='col-md-4'></div>

    <div className='col-md-4 mt-5 card pt-3 pb-4 px-3'>
      <h3 className='text-center mt-4'>Create an Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input value={username} onChange={ e => setUsername(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email"  value={email} onChange={ e => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text"  value={phone_number} onChange={ e => setPhone_number(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password"  value={password} onChange={ e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
        <div className="mb-3">
          <h6>
            Already have an account?
            <NavLink className="nav-link active" aria-current="page" to="/login">
              Login
            </NavLink>
          </h6>
        </div>
      </form>
    </div>
    <div className='col-md-4'></div>
  </div>
  )
}