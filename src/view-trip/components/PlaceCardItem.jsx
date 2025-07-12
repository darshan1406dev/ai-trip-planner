import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REFERENCE_URL } from "../../gemini-travel-planner/GlobalApi";

function PlaceCardItem({ places }) {
    const [PhotoUrl, setPhotoUrl] = useState();
        
          useEffect(() => {
            places&&GetPlacePhoto();
          },[places])
        
          const GetPlacePhoto=async()=>{
            const data={
              textQuery: places.name
            }
            const result= await GetPlaceDetails(data).then(resp=>{
              console.log(resp.data.places[0].photos[3].name);
              const photoUrl=PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
              //console.log(photoUrl);
              setPhotoUrl(photoUrl);
            })
          }
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        places.name
      )} (${places.geoCoordinates.latitude},${
        places.geoCoordinates.longitude
      })`}
      target="_blank"
    >
<div className="border shadow-md p-3 flex gap-5 h-full items-start rounded-lg bg-white hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={PhotoUrl ? PhotoUrl : "/placeholder.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="font-bold text-lg">{places.name}</h2>
          <p className="text-sm text-gray-500">{places.description}</p>
          <div className="flex items-center gap-1 text-sm mt-1 text-gray-700">
            🕘 <span>{places.travelTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
