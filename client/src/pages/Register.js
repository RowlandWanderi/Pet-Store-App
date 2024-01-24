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

    <div className='col-md-4 mt-5 card pt-3 pb-4 px-3 card border-info'>
      <h6 className='text-center mt-4'>Create an Account</h6>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input placeholder='Username' value={username} onChange={ e => setUsername(e.target.value)} type="text" className="form-control" />
        </div>
        <br/>
        <div className="mb-3">
          <input placeholder='Email' type="email"  value={email} onChange={ e => setEmail(e.target.value)} className="form-control" />
        </div>
        <br/>
        <div className="mb-3">
          <input placeholder='Contact' type="text"  value={phone_number} onChange={ e => setPhone_number(e.target.value)} className="form-control" />
        </div>
        <br/>
        <div className="mb-3">
          <input placeholder='Password' type="password"  value={password} onChange={ e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <br/>
        <div className="mb-3">
          <input placeholder='Confirm Password' type="password"  value={password} onChange={ e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <br/>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        <br/>
        <div className="login-link fs-6 d-flex align-items-center ms-5">
          <p className='fw-lighter text-muted mb-0 me-2 ms-5 mt-2'>
            Already have an account?
          </p>
          <NavLink className="nav-link active mt-2" aria-current="page" to="/login">
            <span className='text-primary'>Login</span>
          </NavLink>
        </div>
      </form>
    </div>
    <div className='col-md-4'></div>
  </div>
  )
}
