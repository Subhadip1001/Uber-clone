import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchCaptainDetails = async () => {
          try {
              if (!token) {
                  navigate('/captain-login');
                  return;
              }

              const response = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
              );

              if (response.status === 200) {
                  setCaptain(response.data.captain);
              }
              setIsLoading(false);
          } catch (error) {
              console.error(error);
              localStorage.removeItem('token');
              navigate('/captain-login');
          }
      };

      fetchCaptainDetails();
  }, [token, navigate, setCaptain]);

    if(isLoading){
        return(
            <h2>Loading...</h2>
        )
    }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
