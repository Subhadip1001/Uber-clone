import React from "react";
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {} // Retrieve ride data
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on("ride-ended", () => {
    navigate('/home')
})


  return (
    <div className="h-screen">
        <Link to="/home" className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-3 top-3 text-2xl text-gray-500">
        <i class="ri-home-9-fill"></i>
        </Link>
      <div className="h-[50%]">
        <LiveTracking />
      </div>

      <div className="h-[50%]">
        <div className="flex items-center justify-between p-4">
          <img
            className="h-16"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">Subhadip</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">WB 78 XY 528</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            <h1 className="text-lg font-semibold"> Lorem, ipsum. </h1>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center p-2">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹193.20 </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
            <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
              Make a Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
