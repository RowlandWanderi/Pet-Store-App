import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='mt-3'>
    <footer className="text-white text-center text-lg-start bg-primary">
     <div className="container p-4">
       <div className="row mt-4">
         <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
           <h5 className="text-uppercase mb-4">Reach out</h5>
           <p>
           We'd be delighted to hear from you. You can find us below on all our social media platforms.
           </p>
           <div className='container row'>
             <a href="www.linkedin.com/in/rowland-mwangi-54ab901b3" target="_blank" className='col-md-3'>
               <i className="fa fa-linkedin text-light" aria-hidden="true"></i>
             </a>
             <a href=" https://www.instagram.com/rowland_wanderi/" target="blank" className='col-md-3' >
               <i className="fa fa-instagram text-light" aria-hidden="true"></i>
             </a>
             <a href="https://github.com/RowlandWanderi" target="blank" className='col-md-3'>
               <i className="fa fa-github text-light" aria-hidden="true"></i>
             </a>
           </div>
         </div>
         <div id = "contacts" className="col-lg-4 col-md-6 mb-4 mb-md-0">
           <h5 className="text-uppercase mb-4 pb-1">CONTACTS</h5>
           <ul className="fa-ul ms-2">
             <li className="mb-3">
               <span className="fa-li"><i className="fa fa-home"></i></span><span className="ms-2">Nairobi street, Nairobi, Kenya</span>
             </li>
             <li className="mb-3">
               <span className="fa-li"><i className="fa fa-envelope"></i></span><span className="ms-2">rowlandswanderi@gmail.com</span>
             </li>
             <li className="mb-3">
               <span className="fa-li"><i className="fa fa-phone"></i></span><span className="ms-2">+254718074885</span>
             </li>
           </ul>
         </div>



         <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
           <h5 className="text-uppercase mb-4">Opening hours</h5>

           <table className="table text-center text-white">
             <tbody className="font-weight-normal">
               <tr>
                 <td>Mon - Thu:</td>
                 <td>9am - 6pm</td>
               </tr>
               <tr>
                 <td>Fri - Sat:</td>
                 <td>9am - 5pm</td>
               </tr>
               <tr>
                 <td>Sunday:</td>
                 <td>10am - 4pm</td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
     <div className="text-center p-3 bg-primary">
       © 2024 Copyright:
       <Link className="text-white" to="/">PetHAven.com</Link>
     </div>
</footer>
 </div>
)
}
