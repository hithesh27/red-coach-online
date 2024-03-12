import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function PublicRoute({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[])
  return (
    <div>
     {localStorage.getItem('token')===null && children }
    </div>
  )
}

export default PublicRoute
