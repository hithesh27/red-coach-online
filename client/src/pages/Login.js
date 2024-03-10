import React from 'react'
import {Form} from 'antd'
import { Link } from 'react-router-dom'
function Login() {
  function onFinish(values){
    console.log(values);
  }
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='w-400 card p-3'>
        <h1 className='text-lg'>RedCoach - Login</h1>
        <hr/>
      <Form layout='vertical' onFinish={onFinish} >
        <Form.Item label='Email' name='Email'>
            <input type='text'/>
        </Form.Item>
        <Form.Item label='Password' name='Password'>
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