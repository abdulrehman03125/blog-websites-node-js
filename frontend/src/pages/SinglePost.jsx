import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SinglePost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3003/post/get/${params.id}`).then((res) => {
            setPost(res.data.post)
        })
    }, [])


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className=" cursor-pointer mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back
            </button>
            {/* Large Image */}
            <img
                src={post && post.image}
                alt={(post !== null) ? post.title : ''}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
            />

            {/* Post Details */}
            <div className="mt-8">
                {/* Category */}
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {post && post.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl font-bold mt-4 mb-6">{(post !== null) ? post.title : ''}</h1>

                {/* Author and Date */}
                <div className="flex items-center space-x-4 text-gray-600 mb-8">
                    <span className="text-sm">By {post && post.authorId.name}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{new Date(post && post.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <p dangerouslySetInnerHTML={{__html: post && post.content}} className="text-gray-600 mt-2"></p>
                </div>
            </div>
        </div>
    );
}

export default SinglePost