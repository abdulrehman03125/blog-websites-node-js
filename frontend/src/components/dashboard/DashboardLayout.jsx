import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {CheckAuth} from '../../context/CheckAuth'
import Navbar from '../navbar/Navbar'


const DashboardLayout = () => {
  const ctx = useContext(CheckAuth);
  const navigator = useNavigate();

  useEffect(() => {
    if (ctx.isLogin === false) {
      navigator("/login")
    }
  }, []);

  if (ctx.isLogin === true) {
    return (
      <div>
        <div className="bg-gray-50 text-gray-800 min-h-screen">
          {/* Navbar */}
          <Navbar />
          <div className="container mx-auto p-4">
            <header className="mb-6 text-center">
              <h2 className="text-4xl font-bold text-blue-600">Welcome to My Blog</h2>
              <p className="text-gray-600">Insights, Stories, and Ideas</p>
            </header>

            <Outlet />

          </div>
        </div>
      </div>
    )
  }

}

export default DashboardLayout