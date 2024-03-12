import React from 'react'
import {Form, message,Input} from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  async function onFinish(values){
    console.log(values);
    try{
        const response= await axios.post('http://localhost:5000/api/users/register',values);
        if(response.data.success){
          message.success(response.data.message)
        }else{
          message.error(response.data.message)
        }
    }
    catch(error){
      message.error(error.message);
    }
  }
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='w-400 card p-3'>
        <h1 className='text-lg'>RedCoach - Register</h1>
        <hr/>
      <Form layout='vertical' onFinish={onFinish} >
        <Form.Item label='Name' name='name'>
            <Input type='text'/>
        </Form.Item>
        <Form.Item label='Email' name='email'>
            <Input type='text'/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input type='password' />
        </Form.Item>
        <div className='d-flex justify-content-between align-items-center'>
        <Link to='/login'>Click Here To Login</Link>
        <button className='secondary-btn' type='submit'>Register</button>
      </div>
      </Form>
      </div>
    </div>
  )
}

export default Register
