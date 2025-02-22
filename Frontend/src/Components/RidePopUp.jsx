import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <div className="mt-2 flex justify-between items-center bg-yellow-400 rounded-lg p-2">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--stylist-young-man-fashion-avatar-pack-people-illustrations-4729302.png?f=webp"
          />
          <h3 className="text-lg font-semibold">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h3>
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-xl font-bold">₹<span>{props.ride?.fare}</span></h3>
          <p className="text-sm">Offered</p>
        </div>
      </div>
      <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-speed-up-line font-bold"></i>
            <div>
              <h3 className="text-lg font-medium font"><span>3.2</span>KM</h3>
            </div>
          </div>
            <div className='flex justify-evenly items-center mt-5'>
                <button onClick={()=>{
                    props.setRidePopupPanel(false);
                    props.confirmRide();
                }} className='px-8 py-2 bg-gray-300 rounded-full text-lg font-semibold'>Ignore</button>
                <button onClick={()=>{
                    props.setConfirmToPickupPanel(true);
                    props.setRidePopupPanel(false);
                }} className='px-8 py-2 bg-green-400 rounded-full text-lg font-semibold'>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default RidePopUp
