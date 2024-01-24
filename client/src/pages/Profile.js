import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function Profile() {
const {currentUser,updateUser, delete_your_account} = useContext(UserContext)



const [username, setUsername] = useState(currentUser && currentUser.username)
const [email, setEmail] = useState(currentUser && currentUser.email)
const [phone_number, setPhone] = useState(currentUser && currentUser.phone_number)
const [profile_image_url, setPofileImageUrl] = useState(currentUser && currentUser.profile_image_url)


	const handleSubmit = (e)=>{
	e.preventDefault()

	// call your useContext function
	updateUser(username,email, phone_number,profile_image_url)
	
	
	}
  return (
    <div className="container mt-5">
		{
			currentUser?

		<div className="py-5">
			<div className="row">
				<div className="col-lg-4">
					<div className="card">
						<div className="card-body">
							<div className="d-flex flex-column align-items-center text-center">
								<div className='bg-dark p-5 fw-bold text-white fs-5' style={{borderRadius:'50%'}}>
									<div className='d-flex text-uppercase justify-content-center align-items-center' style={{width:'40px', height:'40px'}}>
									<img src={currentUser && currentUser.profile_image_url} alt="loading" className='img-fluid'/>
									</div>
								</div>
								<div className="mt-3">
									<h4 className='text-uppercase'>{currentUser && currentUser.username}</h4>
									
								
								</div>
							</div>
							<hr className="my-4" />
						
						</div>
					</div>
				</div>
				<div className="col-lg-8">
					<div className="card">
						<div className="card-body p-4">
              <h2>Profile</h2>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Username</h6>
								</div>
								<div className="col-sm-9 text-secondary">
							     	{currentUser && currentUser.username}
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Email</h6>
								</div>
								<div className="col-sm-9 text-secondary">
								{currentUser && currentUser.email}
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Phone</h6>
								</div>
								<div className="col-sm-9 text-secondary">
								{currentUser && currentUser.phone_number}
								</div>
							</div>
							
							
						</div>
					</div>
					<div className="card row mt-5 p-4">
						{/* You can add update user details here */}
						<h2>Update Profile</h2>
						<form onSubmit={handleSubmit}>
							<div class="form-group row my-4">
						     	<label className="form-label col-sm-2">Username</label>
								<div class="col-sm-10">
								<input value={username} onChange={ e => setUsername(e.target.value)} type="text" className="form-control" />
								</div>
							</div>
							<div class="form-group row my-4">
						    	<label className="form-label col-sm-2">Email address</label>
								<div class="col-sm-10">
								<input type="email"  value={email} onChange={ e => setEmail(e.target.value)} className="form-control" />
								</div>
							</div>
							<div class="form-group row my-4">
							    <label className="form-label col-sm-2">Phone</label>
								<div class="col-sm-10">
								<input type="text"  value={phone_number} onChange={ e => setPhone(e.target.value)} className="form-control" />
								</div>
							</div>
              <div class="form-group row my-4">
							    <label className="form-label col-sm-2">Profile image url</label>
								<div class="col-sm-10">
								<input type="text"  value={profile_image_url} onChange={ e => setPofileImageUrl(e.target.value)} className="form-control" />
								</div>
							</div>
							<button type="submit" className="btn btn-success w-100">Save</button>

						</form>


					</div>
					<div className="card row mt-5 p-4">
					   <h2>Danger zone - This action is irreversible</h2>
					   <button onClick={()=>delete_your_account()} className="btn btn-danger w-100">DELETE YOUR ACCOUNT</button>
					</div>
				</div>
			</div>
		</div>
		:
		<div class="alert alert-warning text-center" role="alert">
		Not Authorized to access this page
	    </div>
		}
	</div>
  )
}