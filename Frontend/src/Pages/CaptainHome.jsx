import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmToPickup from "../Components/ConfirmToPickup";
import CaptainRiding from "./CaptainRiding";
import { SocketContext } from "../Context/SocketContext";
import { CaptainDataContext } from "../Context/CaptainContext";
import { set } from "mongoose";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmToPickupPanel, setConfirmToPickupPanel] = useState(false);
  const [captainRidePanel, setCaptainRidePanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupRef = useRef(null);
  const confirmToPickupRef = useRef(null);
  const captainRideRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (captain && socket) {
      socket.emit("join", {
        userType: "captain",
        userId: captain._id,
      });
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({
          //     userId: captain._id,
          //     location: {
          //       ltd: position.coords.latitude,
          //       lng: position.coords.longitude,
          //     }
          //   }
          // );
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation()
  }, [captain, socket]);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
      userId: captain._id,
      rideId: ride._id,
    },
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

    setRidePopupPanel(false);
    setConfirmToPickupPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmToPickupPanel) {
        gsap.to(confirmToPickupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmToPickupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmToPickupPanel]
  );

  useGSAP(
    function () {
      if (captainRidePanel) {
        gsap.to(captainRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(captainRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [captainRidePanel]
  );

  return (
    <div className="h-screen">
      <div>
        <img
          className="w-20 absolute top-5 left-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <Link
          to="/captains/logout"
          className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-3 top-3 text-2xl text-gray-500"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-[60%]">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div className="h-[40%] p-5">
        <CaptainDetails />
      </div>
      {/* pop-up */}
      <div
        ref={ridePopupRef}
        className="fixed z-10 w-screen bottom-0 bg-white p-5"
      >
        <RidePopUp
        ride = {ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmToPickupPanel={setConfirmToPickupPanel}
          confirmRide={confirmRide}
        />
      </div>
      {/* confirm to pick-up */}
      <div
        ref={confirmToPickupRef}
        className="fixed h-screen w-screen z-10 bottom-0 bg-white"
      >
        <ConfirmToPickup setConfirmToPickupPanel={setConfirmToPickupPanel} />
      </div>
      {/* Captain riding  */}
      <div
        ref={captainRideRef}
        className="fixed h-screen w-screen z-10 bottom-0 bg-white"
      >
        <CaptainRiding />
      </div>
    </div>
  );
};

export default CaptainHome;
