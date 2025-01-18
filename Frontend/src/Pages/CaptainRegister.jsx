import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";

const CaptainRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };
    console.log(newCaptain);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

      if(response.status === 201){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
      alert('Account created succefully')
    } catch (error) {
      alert(error.response?.data?.errors?.[0]?.msg || "Signup failed. Please try again.");
      console.log(error);
    }


  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="h-32 mb-8 block mx-auto"
          src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-3 mb-6">
            {/* first name */}
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
              placeholder="First name"
              required
            />
            {/* last name */}
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="example@gmail.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full font-medium text-lg placeholder:text-base"
            placeholder="Password"
            required
          />

          {/* VEHICLE */}

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className="bg-black text-white semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainRegister;
