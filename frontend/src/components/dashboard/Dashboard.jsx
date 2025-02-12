import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { CheckAuth } from '../../context/CheckAuth';
import { CheckAuth } from '../../context/CheckAuth';
import PostsDataTable from '../PostsDataTable ';



const Dashboard = () => {
  const navigator = useNavigate();
  const AuthCtx = useContext(CheckAuth);


  console.log(AuthCtx);


  const logout = () => {
    AuthCtx.logout();
    navigator("/login");
  }

  useEffect(() => {
    if (AuthCtx.isLogin === false) {
      navigator("/login")
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <main className="md:col-span-2 space-y-6">

        <PostsDataTable  />

      </main>
      {/* <button className="hover:text-blue-200" onClick={() => logout()}>Logout</button> */}
    </div>
  )
}

export default Dashboard