import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import petlogo from '../images/petstorelogo-removebg-preview.png'
import { UserContext } from '../context/UserContext'

export default function Navbar() {

  const {currentUser, logout} = useContext(UserContext)

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={petlogo} alt ="Loading" width = {110}/>
        </Link>
          <span className="navbar-text fs-3">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item me-5">
                  <Link className="nav-link active text-dark" aria-current="page" to="/">Home</Link>
                </li>

                {currentUser && currentUser.username?
                <>

                <li className="nav-item">
                  <button className="btn btn-primary me-2">
                     <Link className="nav-link active text-light" to="/profile">Profile</Link>
                  </button>
                  
                </li>
                <li className="nav-item" >
                <button onClick={()=>logout()} className="btn btn-danger ">
                  <span  className="nav-link active text-white">Logout</span>
                 </button>
                </li>
                
                 </>:

                 <>
                 <button className="btn btn-success btn-sm me-3">
                   <Link to="/register" className="nav-link active text-white">Register</Link>
                 </button>
                 <button className="btn btn-success btn-sm">
                   <Link to="login" className="nav-link active text-white">Login</Link>
                 </button>

               </>
               }

              </ul>
          </span>
        </div>
      </nav>

      
                 
               
  </div>
)
}
  

