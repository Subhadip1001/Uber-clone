import React,{ useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e)=>{
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
  
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
      // chnage this statement
      alert("Account created sucessfully:)");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      alert(error.response?.data?.errors?.[0]?.msg || "Signup failed. Please try again.");
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
            <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-3 mb-6'>
            {/* first name */}
            <input
            type="text"
            value={firstName}
            onChange={(event)=> setFirstName(event.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="First name"
            required
          />
          {/* last name */}
          <input
            type="text"
            value={lastName}
            onChange={(event)=> setLastName(event.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="Last name"
          />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(event)=> setEmail(event.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="example@gmail.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            type="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="Password"
            required
          />
          <button className="bg-black text-white semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Sign up
          </button>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserSignup
