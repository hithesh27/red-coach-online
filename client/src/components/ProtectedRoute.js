import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
function ProtectedRoute({children}){
    const Navigate=useNavigate();
  const [loading,setLoading]=useState(true);


    const verifyToken=async ()=>{
      
            const response=await axios.post('http://localhost:5000/api/users/get-user-by-id',{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log('response')
        if(response.data.success){
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
    },[])
  return (
    <div>
        { !loading && children}
        {loading && <div>loading</div>}
    </div>
  )
}

export default ProtectedRoute;