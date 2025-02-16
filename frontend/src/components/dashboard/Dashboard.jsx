import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CheckAuth } from '../../context/CheckAuth';
import PostsDataTable from '../PostsDataTable ';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedData, setUpdatedData] = useState({ title: '', content: '' });



  const ctx = useContext(CheckAuth)



  const notifyError = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false
  });

  const notifySuccess = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false
  });


  // console.log(CheckAuth);

  useEffect(() => {
    axios.get("http://localhost:3003/post/all/user", {
      headers: { "Authorization": `Bearer ${ctx.token}` }
    })
      .then(res => setPosts(res.data.posts))
      .catch(err => console.log(err.message));
  }, []);


  // Start editing function
  const startEditing = (post) => {
    if (!post || !post._id) {
      console.error("Invalid post data:", post);
    }
    setEditingPost(post._id); // Ensure valid post ID is set
    setUpdatedData({ title: post.title, content: post.content });
  };

  // // Handle input changes
  // const handleChange = (e) => {
  //   setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  // };

  
  // Update function 
  const handleUpdate = async (_id) => {
    if (!editingPost) {
      console.error("No post selected for update.");
      notifyError("No post selected for update.");
      return;
    }
    try {
      await axios.put(`http://localhost:3003/post/update/${editingPost}`, updatedData, {
        headers: { Authorization: `Bearer ${ctx.token}` },
      });

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === editingPost ? { ...p, ...updatedData } : p))
      );

      notifySuccess('Post successfully updated');
      setEditingPost(null);
    } catch (error) {
      notifyError(error.message);
    }
  };


  // delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/post/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${ctx.token}`
        }
      });

      // sucess remove id posts 
      setPosts((prevPosts) => {
        const newPosts = prevPosts.filter((p) => p._id !== id);
        return newPosts;
      });

      notifySuccess("Post successfully deleted");

    } catch (er) {
      console.log(er);
      // console.log(er.response.data)
      notifyError(er);
    }

  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


      <main className="md:col-span-2 space-y-6">

        <PostsDataTable posts={posts} onDelete={handleDelete} handleUpdate={handleUpdate} onEdit={startEditing} />


      </main>

    </div>
  )
}

export default Dashboard