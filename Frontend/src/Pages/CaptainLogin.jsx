import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();
  
    const submitHandler = async (e)=>{
      e.preventDefault();

      const Captain = {
        email:email,
        password:password
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, Captain);

        if(response.status === 200){
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
        }
      } catch (error) {
        alert(error.response?.data?.errors?.[0]?.msg || "Login failed. Please try again.");
        console.log(error);
      }
    }

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
          <div>
            <img
              className="h-32 mb-8 block mx-auto"
              src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            />
            <form onSubmit={submitHandler}>
              <h3 className="text-lg font-medium mb-2">What's your email</h3>
              <input
                type="email"
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
                placeholder="example@gmail.com"
                required
              />
              <h3 className="text-lg font-medium mb-2">Enter your password</h3>
              <input
                type="password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
                placeholder="Password"
                required
              />
              <button className="bg-black text-white semibold mb-3 rounded px-4 py-2 w-full text-lg">
                Login
              </button>
              <p className="text-center">
                New here?{" "}
                <Link to="/captain-signup" className="text-blue-600">
                  Register as a Captain
                </Link>
              </p>
            </form>
          </div>
    
          <div>
            <Link to="/login" className="bg-[#FE9900] flex items-center justify-center text-white semibold mt-8 rounded px-4 py-2 w-full text-lg">
              Login as a User
            </Link>
          </div>
    </div>
  )
}

export default CaptainLogin
