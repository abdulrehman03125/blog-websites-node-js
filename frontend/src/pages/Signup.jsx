import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useLoadingBar } from "react-top-loading-bar";

export const Signup = () => {


  const { start, complete } = useLoadingBar({
    color: "green",
    height: 2,
  })
  const navigate = useNavigate();
  const [fileList, setFileList] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // runs on form submit  
  const onFinish = (values) => {
    setLoading(true)
    // console.log("Signup Success:", values);

    // sending multipart form data
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", fileList[0].originFileObj);


    start()
    axios.post("http://localhost:3003/user/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }

      // )
    }).then((res) => {

      // console.log(res.data)
      navigate("/login")

      complete()
    }).catch((err) => {

      console.log(err.response.data)
      setErrors(err.response.data.errors);

    }).finally(() => setLoading(false))

    // navigate("/");
  };


  // runs when we select file
  const handleUpload = (info) => {
    setFileList(info.fileList);
  };


  return (
    <Card title="Sign Up" style={{ width: 560, margin: "auto", marginTop: 100 }}>

      {
        errors && <div className='bg-red-100 p-5 rounded-sm mb-4'>
          <h4 className='text-red-400 text-xl font-bold mt-4'>Errors occured</h4>
          <ul className="list-disc ps-10">

            {
              Array.isArray(errors) ? (
                errors.map(er => {
                  return (<>
                    <li className=''>{er.message}</li>
                  </>)
                })
              ) : <li className="">{errors}</li>

            }

          </ul>
        </div>
      }

      <Form onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true, message: "Please enter your name!", type: "text" }]}>
          <Input size="large" placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!", type: "email" }]}>
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password size='large' placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Upload beforeUpload={() => false} onChange={handleUpload} fileList={fileList}>
            <Button size='large' icon={<UploadOutlined />}>Upload Profile Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} size='large' type="primary" htmlType="submit" block>Sign Up</Button>
        </Form.Item>
      </Form>
      <Link to="/login">Already have an account? Login</Link>
    </Card>
  )
}