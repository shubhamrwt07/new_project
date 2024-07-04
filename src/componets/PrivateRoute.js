import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
    const {Component}=props
    const navigate=useNavigate()

useEffect(()=>{
    let login= sessionStorage.getItem('user')
    if(!login){
navigate('/home')
    }
},[])

  return (
    <div><Component/></div>
  )
}

export default ProtectedRoute