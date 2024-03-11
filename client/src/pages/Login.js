import React from 'react'
import {Form,message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login() {
  const navigate=useNavigate();
  async function onFinish(values){
    try{
      const response=await axios.post('http://localhost:5000/api/users/login',values);
      if(response.data.success){
        message.success(response.data.message);
        localStorage.setItem('token',response.data.data);
        navigate("/")
      }else{
        message.error(response.data.message);
      }
    }
    catch(error){
      message.error(error.message);
    }
  }
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='w-400 card p-3'>
        <h1 className='text-lg'>RedCoach - Login</h1>
        <hr/>
      <Form layout='vertical' onFinish={onFinish} >
        <Form.Item label='Email' name='email'>
            <input type='text'/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <input type='password' />
        </Form.Item>
        <div className='d-flex justify-content-between align-items-center'>
        <Link to='/register'>Click Here To Register</Link>
        <button className='secondary-btn' type='submit'>Login</button>
      </div>
      </Form>
      </div>
    </div>
  )
}

export default Login