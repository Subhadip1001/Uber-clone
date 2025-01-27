import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);
    }else if (activeField === 'destination') {
      setDestination(suggestion.description);
    }
    // setPanelOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        {suggestions.map((value, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(value)}
            className="flex gap-4 p-3 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{value.description}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default LocationSearchPanel;
