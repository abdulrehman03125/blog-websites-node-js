import React from 'react'
import DataTable from 'react-data-table-component';

const PostsDataTable = ({ posts }) => {

    const handleDelete = (id) => {
        console.log("deleted")
    }

    const handleEdit = (id) => {

    }

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
                    <button
                        onClick={() => handleEdit(row._id)}
                        className="cursor-pointer px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="cursor-pointer px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        }
    ];

    const data = [
        {
            name: 'Image',
        },
        {
            name: 'Title',

        },
        {
            id: 3,
            name: 'Excerpt',

        },
        {

            name: 'Status',

        },
        {

            name: 'Category',

        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-1">
                    <button
                        onClick={() => handleEdit(row._id)}
                        className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        }
    ]
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination={true}
                paginationPerPage={2}
            />
        </div>
    )
}

export default PostsDataTable 
