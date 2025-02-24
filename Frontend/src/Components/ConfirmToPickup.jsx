import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmToPickup = (props) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submitHandel = async(e) => {
    e.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId: props.rideId._id,
      otp: otp
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if(response.status === 200){
      props.setConfirmToPickupPanel(false);
      props.setRidePopUpPanel(false);
      navigate('./captain-riding');
    }
  };

  return (
    <div className="p-5">
      <i
        onClick={() => {
          props.setConfirmToPickupPanel(false);
        }}
        className="ri-arrow-left-long-line text-2xl font-semibold"
      ></i>
      <div className="mt-2 flex justify-between items-center bg-yellow-400 rounded-lg p-2">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--stylist-young-man-fashion-avatar-pack-people-illustrations-4729302.png?f=webp"
          />
          <h3 className="text-lg font-semibold">User name</h3>
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-xl font-bold">
            ₹<span>110</span>
          </h3>
          <p className="text-sm">Offered</p>
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600"></p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600"></p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="ri-speed-up-line font-bold"></i>
          <div>
            <h3 className="text-lg font-medium font">
              <span>3.2</span>KM
            </h3>
          </div>
        </div>
        <form onSubmit={submitHandel}>
          <input
            className="px-3 py-2 bg-[#eee] w-full rounded-lg mb-8 mt-6 font-mono"
            type="number"
            value={otp}
            onChange={e=>setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
      <Link
        to="/captain-riding"
        className=" flex bg-yellow-400 px-8 py-3 rounded-lg w-full font-semibold justify-center text-lg"
      >
        START
      </Link>
        </form>
      </div>
    </div>
  );
};

export default ConfirmToPickup;
