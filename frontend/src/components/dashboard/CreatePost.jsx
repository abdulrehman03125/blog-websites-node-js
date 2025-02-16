
import React, { useContext, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {CheckAuth} from '../../context/CheckAuth'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [form] = Form.useForm();
  const ctx = useContext(CheckAuth);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');
  const navigator = useNavigate();


  // onSubmit
  const onFinish = (values) => {
    console.log(values);

    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("excerpt", values.excerpt);
    formdata.append("content", content);
    formdata.append("readingTime", values.readingTime);
    formdata.append("category", values.category);
    formdata.append("image", fileList[0].originFileObj)

    axios.post("http://localhost:3003/post/create", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${ctx.token}`
      }
    }).then(res => {
      console.log(res.data)
      navigator("/")
    }).catch(er => {
      console.log(er.response.data);
      // authentication failed 401 due to bad token  
      if (err.status === 401) {
        ctx.logout();
        navigator("/");
      }
    })

  };


  // image select
  const onImageSelect = (file) => {
    console.log(file);
    setFileList(file.fileList);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }} className="bg-white">
      <h1 className='text-xl'>Create New Post</h1>

      <Form
        form={form}
        name="create-post"
        layout='vertical'
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="title"
          label="Post Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name="excerpt"
          label="Post Excerpt"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Post Content" style={{ marginBottom: "50px" }}>
          <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: "300px", display: "blo" }} />
        </Form.Item>


        <Form.Item
          name="readingTime"
          label="Reading Time Of This Post"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Category"
          >
            <Option value="tech">Tech</Option>
            <Option value="lifestyle">Lifestyle</Option>
            <Option value="travel">Travel</Option>
            <Option value="food">Food</Option>
          </Select>
        </Form.Item>


        <Upload onChange={onImageSelect} beforeUpload={() => false} maxCount={1} fileList={fileList}>
          <Button style={{ marginBottom: "10px" }} icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>


        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default CreatePost