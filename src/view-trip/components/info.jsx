import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { CiShare1 } from "react-icons/ci";
import { GetPlaceDetails, PHOTO_REFERENCE_URL } from "../../gemini-travel-planner/GlobalApi";

function InfoSection({ trip }) {

  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery: trip?.userSelection?.location?.label
    }
    const result= await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const photoUrl=PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      console.log(photoUrl);
      setPhotoUrl(photoUrl);
    })
  }

  return (
    <div>
      <img
        src={PhotoUrl ? PhotoUrl : "/placeholder.jpg"}
        className="h-[350px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div classname="flex flex-col my-5 gap-2">
          <h2 className="text-2xl font-bold mt-5">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-700 font-bold mt-5 text-xs md:text-lg">
              📅 {trip?.userSelection?.noofdays} Day
            </h2>
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-700 font-bold mt-5 text-xs md:text-lg">
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-700 font-bold mt-5 text-xs md:text-lg">
              🥂No. of Traveler: {trip?.userSelection?.travelers}
            </h2>
          </div>
        </div>
        <Button ><CiShare1 /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
