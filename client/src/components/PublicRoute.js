import React from 'react'

function PublicRoute({children}) {
  console.log('Publicroute');
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicRoute
