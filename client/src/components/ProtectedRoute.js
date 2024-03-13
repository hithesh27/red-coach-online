import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { setUser } from '../redux/usersSlice';
import { useDispatch } from 'react-redux';

function ProtectedRoute({children}){
    const Navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const dispatch=useDispatch();

    const verifyToken=async ()=>{
        const response=await axios.post('http://localhost:5000/api/users/get-user-by-id',{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
       // console.log('response')
        if(response.data.success){
            //console.log(response.data.data)
            dispatch(setUser(response.data.data))
            setLoading(false);
        }
        else{
            setLoading(false);
            localStorage.removeItem('token');
            message.error(response.data.message);
            Navigate('/login');
            
        }
   
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            verifyToken();
        }else{
            setLoading(false)
            Navigate('/login');
        }
    },[Navigate])
  return (
    <div>
        { !loading && children}
        {loading && <div>loading</div>}
    </div>
  )
}

export default ProtectedRoute;