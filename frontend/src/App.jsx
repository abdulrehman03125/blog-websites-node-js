import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import { Signup } from './pages/Signup';
import SinglePost from './pages/SinglePost';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from "./components/dashboard/Dashboard";
import CreatePost from './components/dashboard/CreatePost';
import { ToastContainer } from 'react-toastify';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/post/:id' element={<SinglePost />} />

        <Route path='dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard/>}/>
        <Route path='create' element={<CreatePost/>}/>


        </Route>


      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
