import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="mb-10 mt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full"
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
          />
          <h3 className="text-lg font-semibold">Captain Test</h3>
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-xl font-bold">₹200.10</h3>
          <p className="text-sm">Earend</p>
        </div>
      </div>
      <div className="bg-gray-300 font-bold flex items-center justify-between p-5 rounded-lg">
        <div className="flex flex-col items-center">
          <i className="ri-timer-2-line text-4xl"></i>
          <h2>10.2h</h2>
          <p className="text-xs">Hour Online</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-speed-up-line text-4xl"></i>
          <h2>10.2h</h2>
          <p className="text-xs">Hour Online</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="ri-survey-line text-4xl"></i>
          <h2>10.2h</h2>
          <p className="text-xs">Hour Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
