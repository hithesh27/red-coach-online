import React from 'react'
import {  useSelector } from 'react-redux'

function Home() {
  const userName=useSelector(state => state.user.user);
  console.log(userName)
  if(!userName){
  return  (<div>loading</div>)
  }
  return (
    <div>
     <div>{userName.name}</div>
     <div>{userName.email}</div>
    </div>
  )
}

export default Home

