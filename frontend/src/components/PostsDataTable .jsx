import React from 'react'
import DataTable from 'react-data-table-component';

const PostsDataTable = ({ posts, onDelete, onEdit, editingPost}) => {

    const handleDelete = (id) => {
        console.log("deleted")
        onDelete(id)
    }

    const handleEdit = (post) => {
        console.log("Editing post:", post);
        onEdit(post); // Pass the correct post to Dashboard
    };

    const columns = [
        {
            name: 'Image',
            selector: row => <img src={row.image} alt="User" width="50" height="50" style={{ borderRadius: '5px' }} />,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Excerpt',
            selector: row => row.excerpt,
        },
        {
            name: 'Status',
            selector: row => (row.isPublished == true) ? <span className='bg-green-400 p-2 px-5 inline-block rounded-sm text-white'>Published</span> : <span className='px-4 inline-block rounded-sm bg-red-400 text-white p-2'>Draft</span>,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-1">
                    <button onClick={() => handleEdit(row)}  className="bg-yellow-500 text-white px-4  py-3 hover:bg-yellow-300 rounded">
                        Edit
                    </button>
                </div>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-1">
                
                    <button   className="bg-blue-500 text-white px-2 py-3 hover:bg-green-400 rounded">
                        Update
                    </button>
                  
                </div>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-1">
                  
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="cursor-pointer px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        }
    ];


    return (
        <>
            <DataTable

                columns={columns}
                data={posts}
                pagination={true}
                paginationPerPage={1}
            />
             {/* Render edit form if editing a post */}
             {editingPost && (
                <div className="p-5 bg-gray-200 rounded-lg mt-4">
                    <h2 className="text-lg font-bold mb-3">Edit Post</h2>
                    
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={editingPost.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-3"
                    />

                    <label className="block mb-2 font-semibold">Content</label>
                    <textarea
                        name="content"
                        value={editingPost.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-3"
                    ></textarea>

                    <div className="flex space-x-2">
                        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
                            Update
                        </button>
                        <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
    
      </>
    )
}

export default PostsDataTable 
