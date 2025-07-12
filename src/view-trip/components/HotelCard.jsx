import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REFERENCE_URL } from "../../gemini-travel-planner/GlobalApi";

function HotelCard({ item }) {

    const [PhotoUrl, setPhotoUrl] = useState();
    
      useEffect(() => {
        item&&GetPlacePhoto();
      },[item])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery: item?.hotelName
        }
        const result= await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[3].name);
          const photoUrl=PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
          console.log(photoUrl);
          setPhotoUrl(photoUrl);
        })
      }

    return (
        <Link
            to={
                "https://www.google.com/maps/search/?api=1&query=" +
                item?.hotelName +
                "," +
                item?.address
            }
            target="_blank"
        >
            <div className="hover:scale-105 transition-all cursor-pointer bg-white rounded-lg shadow p-3 h-full flex flex-col justify-between">
                <img src={PhotoUrl ? PhotoUrl : "/placeholder.jpg"} className=" rounded-lg h-[180px] w-full object-cover" />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{item.hotelName}</h2>
                    <h2 className="text-xs text-gray-700">📍 {item.address}</h2>
                    <div className="flex">
                        <h2 className="text-xs font-bold">💵 {item?.price?.amount} </h2>
                        <h2 className="text-xs font-bold mx-1">
                            {" "}
                            {item?.price?.currency} per night
                        </h2>
                    </div>
                    <h2 className="text-sm font-bold">⭐ {item.rating} stars</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCard;
