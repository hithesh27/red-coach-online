import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ProtectedRoute({children}){
    const Navigate=useNavigate();
  const [loading,setLoading]=useState(true);


    const verifyToken=async ()=>{
        const response=await axios.post('http://localhost:5000/api/users/get-user-by-id',{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response)
        if(response.data.success){
            setLoading(false);
        }
        else{
            setLoading(false)
            Navigate('/api/users/login');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            verifyToken();
        }
    },[])
  return (
    <div>
        { !loading && <div>{children}</div>}
        {loading && <div>loading</div>}
    </div>
  )
}

export default ProtectedRoute;