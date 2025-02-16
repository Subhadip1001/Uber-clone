import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();

    const newUser = {
      email:email,
      password:password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);

      if(response.status === 200){
        const data = response.data;
        setUser(data.user);
        // setUser(data.findUser);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      alert(error.response?.data?.errors?.[0]?.msg || "Please check your email or password!");
    }
  }

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white semibold mt-8 rounded px-4 py-2 w-full text-lg">
          Login as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
