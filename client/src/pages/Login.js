import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const { login, resetPassword } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (showResetForm) {
      // Handle password reset
      resetPassword(email, newPassword);
    } else {
      // Handle login
      login(username, password);
    }

    setUsername('');
    setPassword('');
    setEmail('');
    setNewPassword('');
  };

  return (
    <div className='container row'>
      <div className='col-md-4'></div>

      <div className='col-md-4 mt-5 card pt-3 pb-4 px-3'>
        <h3 className='text-center mt-4'>{showResetForm ? 'Reset Password' : 'Login'}</h3>
        <form onSubmit={handleSubmit}>
          {!showResetForm ? (
            <>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' className='form-control' />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' />
              </div>
            </>
          ) : (
            <>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='form-control' />
              </div>

              <div className='mb-3'>
                <label className='form-label'>New Password</label>
                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='form-control' />
              </div>
            </>
          )}

          <button type='submit' className='btn btn-success w-100'>
            {showResetForm ? 'Reset Password' : 'Login'}
          </button>

          <div className='mb-3'>
            {showResetForm ? (
              <p className='m-2'>
                 {' '}
                <button className="btn btn-success w-100"onClick={() => setShowResetForm(false)}>
                  <span >Back to Login</span>
                </button>
              </p>
            ) : (
              <p className='m-2'>
                Forgot your password?{' '}
                <button className="btn btn-success w-100 "onClick={() => setShowResetForm(true)}>
                  <span >Reset Password</span>
                </button>
              </p>
            )}
          </div>

          {!showResetForm && (
            <div className='mb-3'>
              <h6 className='text-center'>
                <p className='m-2'>
                  Don't have an account?{' '}
                  <button className='btn btn-info'>
                    <NavLink className='nav-link active' aria-current='page' to='/register'>
                      Sign Up
                    </NavLink>
                  </button>
                </p>
              </h6>
            </div>
          )}
        </form>
      </div>

      <div className='col-md-4'></div>
    </div>
  );
}