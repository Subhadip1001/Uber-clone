import React from "react";

const VehiclePanel = (props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl mb-2">Choose your ride</h2>
        <i
          onClick={() => {
            props.setVehiclePanel(false);
          }}
          className="ri-close-fill mr-5 font-bold text-2xl cursor-pointer"
        ></i>
      </div>
      <div
        onClick={() => {
          props.setConfirmVehiclePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex items-center justify-between hover:border-2 hover:border-black p-2 rounded-lg"
      >
        <img
          className="h-16"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div>
          <h4 className="font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="text-xs">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>

      <div className="flex items-center justify-between hover:border-2 hover:border-black p-2 rounded-lg">
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        />
        <div>
          <h4 className="font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="text-xs">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>

      <div className="flex items-center justify-between hover:border-2 hover:border-black p-2 rounded-lg">
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div>
          <h4 className="font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="text-xs">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>
    </>
  );
};

export default VehiclePanel;
