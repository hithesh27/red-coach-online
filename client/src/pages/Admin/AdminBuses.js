import React from 'react'
import PageTitle from '../../components/PageTitle'
import BusForm from '../../components/BusForm';
import { useState } from 'react';

function AdminBuses() {
  const [showBusForm,setShowBusForm]=useState(false);
  console.log("Admin-Bus");
  return (
    <div>
    <div className='d-flex justify-content-between'>
    <PageTitle title='Buses'/>
     <button className='primary-btn'
     onClick={()=>{setShowBusForm(true)}} >
      Add
     </button>
   </div>
 {showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} type="add"></BusForm>} 
   </div>
  )
}

export default AdminBuses
