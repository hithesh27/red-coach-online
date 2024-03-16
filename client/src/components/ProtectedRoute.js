import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { setUser } from '../redux/usersSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showLoading ,hideLoading} from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute({children}){
    const Navigate=useNavigate();
    const dispatch=useDispatch();
    const  {loading}=useSelector((state)=>state.alert);
            const verifyToken=async ()=>{
                dispatch(showLoading());
            try{
                const response=await axios.post('http://localhost:5000/api/users/get-user-by-id',{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            console.log('response');
            if(response.data.success){
                console.log('dispatch')
                console.log('hello world',response.data.data)
                dispatch(setUser(response.data.data))
            }
            else{
                localStorage.removeItem('token');
                message.error(response.data.message);
                Navigate('/login');
            }
        }
        catch(error){
            dispatch(hideLoading())
            message.error(error.message);
        }
    }
useEffect(()=>{
    if(localStorage.getItem('token')){
        verifyToken();
    }else{
        
        Navigate('/login');
    }
   },[])
  return (
    <div>
        { !loading && <DefaultLayout>{children}</DefaultLayout>}
    </div>
  )
}

export default ProtectedRoute;