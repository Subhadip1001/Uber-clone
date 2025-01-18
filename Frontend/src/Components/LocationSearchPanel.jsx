import React from "react";

const LocationSearchPanel = ({
  suggestions=[],
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        {
        suggestions.map((value, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(value)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">{value}</h4>
          </div>
        ))
        }
      </div>
    </>
  );
};

export default LocationSearchPanel;
