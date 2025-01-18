import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
      try {
        if (!token) {
          navigate('/login');
        }
      } catch (error) {
        console.log('Error :' + error);
      }
    },[token, navigate])


  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
