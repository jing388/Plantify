import React from "react";

const PlantDialog = ({ message }) => (
  <div className="relative px-6 py-4 bg-white text-black rounded-xl shadow-md">
    <p className="text-center text-lg">{message}</p>
    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
  </div>
);

export default PlantDialog;
