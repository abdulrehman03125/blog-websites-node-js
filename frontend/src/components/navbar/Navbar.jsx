import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CheckAuth } from '../../context/CheckAuth';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const AuthCtx = useContext(CheckAuth)
const ctx = useContext(CheckAuth)
  const navigator = useNavigate();

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Blog</h1>
        </div>
        <div className='flex space-x-4'>


          <Link to="/" className="cursor-pointer text-white px-4 py-2 me-2">Home</Link>
          {(AuthCtx.isLogin == true) ? (
            <>
              <Link to="/Profile" className="cursor-pointer text-white px-4 py-2 me-2">Profile</Link>
              {/* <button onClick={AuthCtx.logout} className="hover:text-blue-200">Logout</button> */}
              <button
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 me-2 rounded hover:bg-blue-600"
                onClick={() => navigator("/dashboard")}
              >
                Dashboard
              </button>

              <button
                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigator("/dashboard/create")}
              >
                Create Post
              </button>
              <button
                className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  ctx.logout();
                  navigator("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Signup" className="cursor-pointer text-white px-4 py-2 me-2">Signup</Link>
              <Link to="/Login" className="cursor-pointer text-white px-4 py-2 me-2">Login</Link>
            </>
          )}


        </div>
      </div>
    </nav>
  )
}
export default Navbar

