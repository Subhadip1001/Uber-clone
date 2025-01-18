import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmedVehiclePanel from "../Components/ConfirmedVehiclePanel";
import LookingForDriver from "../Components/LookingForDriver";
import WatingForDriver from "../Components/WatingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpne, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirVehiclePanel, setConfirmVehiclePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [ waitingForDriver, setWaitingForDriver ] = useState(false);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([]);
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([]);

  const panelRef = useRef(null);
  const vehicleRef = useRef(null);
  const vehicleInfoRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpne) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
      }
    },
    [panelOpne]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehicleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function(){
      if(confirVehiclePanel){
        gsap.to(vehicleInfoRef.current,{
          transform: "translateY(0)"
        });
      }else{
        gsap.to(vehicleInfoRef.current,{
          transform: "translateY(100%)"
        });
      }
    },[confirVehiclePanel]
  );

  useGSAP(
    function(){
      if(lookingForDriverPanel){
        gsap.to(lookingForDriverRef.current,{
          transform: "translateY(0)"
        });
      }else{
        gsap.to(lookingForDriverRef.current,{
          transform: "translateY(100%)"
        });
      }
    },[lookingForDriverPanel]
  );

  useGSAP(
    function(){
      if(waitingForDriver){
        gsap.to(waitingForDriverRef.current,{
          transform: "translateY(0)"
        });
      }else{
        gsap.to(waitingForDriverRef.current,{
          transform: "translateY(100%)"
        });
      }
    },[waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber logo */}
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      />

      {/* Map image */}
      <div>
        <img
          className="w-screen h-screen cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      {/* pick-up and destination panel */}
      <div className="flex flex-col justify-end h-screen absolute bottom-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          {panelOpne ? (
            <i
              onClick={() => {
                setPanelOpen(false);
              }}
              className="ri-arrow-down-s-line text-3xl cursor-pointer"
            ></i>
          ) : (
            <h4 className="text-2xl font-semibold">Find a trip</h4>
          )}
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              onClick={(e) => {
                setPanelOpen(true);
              }}
              className="bg-[#eeeeee] px-8 py-2 rounded-lg mt-5 w-full text-lg"
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Add a pic-up location"
            />
            <input
              onClick={(e) => {
                setPanelOpen(true);
              }}
              className="bg-[#eeeeee] px-8 py-2 rounded-lg mt-4 w-full text-lg"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Select location */}
        <div ref={panelRef} className="h-0 bg-white px-5 py-1">
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>

      {/* Select vehicle */}
      <div
        ref={vehicleRef}
        className="fixed z-10 w-screen bottom-0 bg-white p-5 translate-y-full"
      >
        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmVehiclePanel={setConfirmVehiclePanel}/>
      </div>

      {/* Car details page */}
      <div ref={vehicleInfoRef} className="fixed z-10 w-screen bottom-0 bg-white p-5 translate-y-full">
        <ConfirmedVehiclePanel setVehiclePanel={setVehiclePanel} setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingForDriverPanel={setLookingForDriverPanel}/>
      </div>

      {/* Looking for a driver panel */}
      <div ref={lookingForDriverRef} className="fixed z-10 w-screen bottom-0 bg-white p-5 translate-y-full">
        <LookingForDriver setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingForDriverPanel={setLookingForDriverPanel}/>
      </div>

      {/* Driver Info */}
      <div className="fixed z-10 w-screen bottom-0 bg-white p-5 translate-y-full">
        <WatingForDriver ref={waitingForDriverRef} waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
