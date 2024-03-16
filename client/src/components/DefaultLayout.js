import React from 'react'
import '../resources/layout.css'
import Item from 'antd/es/list/Item';
import { useNavigate } from 'react-router-dom';

function DefaultLayout({children}) {
    const navigate=useNavigate();
    const userMenu=[];
    const adminMenu=[
    {
        name:'Home',
        path:'/admin',
        icon:'ri-home-line'
    },
    {
        name:'Buses',
        path:'/admin/buses',
        icon:'ri-bus-line'
    },
    {
        name:'Users',
        path:'admin/users',
        icon:'ri-file-user-line'
    },
    {
        name:'Bookings',
        path:'admin/bookings',
        icon:'ri-file-list-line'
    },
    {
        name:'Logout',
        path:'admin/logout',
        icon:'ri-logout-box-line'
    }
];
    const menuToBeRendered=adminMenu;
    const activeRoute=window.location.pathname;
  return (
    <div className='layout-parent'>
       <div className='sidebar'>
       <div className='d-flex flex-coloumn gap-2'>
        {
            menuToBeRendered.map((Item,index)=>{
          return (
            <div  className='menu-item'>
          <i className={Item.icon}></i>
            <span onClick={()=>navigate(`${Item.path}`)}>{Item.name}</span>
            </div>
            )
    })
}
       </div>
       </div>
       <div className='body'>
        <div className='header'>
            <h1>header</h1>
        </div>
        <div className='content'>
        {children}
        </div>
       </div>
    </div>
  )
}

export default DefaultLayout