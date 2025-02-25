import React, { useRef, useState } from 'react'
import FinishRide from '../Components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../Components/LiveTracking';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);

    const finishRideRef = useRef(null);

    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRideRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(finishRideRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      );

  return (
    <div className='h-screen'>
      <div className='h-[80%]'>
        <LiveTracking/>
      </div>
      <div className='h-[20%] bg-yellow-400 flex items-center justify-between p-3'>
        <h2 className='font-semibold text-lg'>Complete ride in 3 mins</h2>
        <button className='px-4 py-2 bg-black rounded-lg text-white font-semibold'>Complete Ride</button>
      </div>
      <div className="fixed w-full p-5 z-10 bottom-0 bg-white">
        <FinishRide/>
      </div>
    </div>
  )
}

export default CaptainRiding
