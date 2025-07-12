import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  console.log("Hotels", trip?.tripData?.hotels);
  return (
    <div className=" mt-10">
      <h2 className="text-xl font-bold mb-10">Hotel Recomendations</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => {
            
          return (
           <HotelCard item={item}/>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
