import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import { PHOTO_REFERENCE_URL } from "../../gemini-travel-planner/GlobalApi";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-2xl mt-5">Places to visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div>
            <h2 className="font-bold text-md mt-10">{item.day}</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 content-stretch ">
              {item.places.map((plan, index) => (
                <div className="my-3 h-full flex flex-col ">
                  <h2 className="font-medium text-sm text-blue-600 mb-5">
                    {plan.bestTime}
                  </h2>
                  <div className="flex-1 flex flex-col">
                    <PlaceCardItem places={plan} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
