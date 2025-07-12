import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REFERENCE_URL } from '../../gemini-travel-planner/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
     const [PhotoUrl, setPhotoUrl] = useState();
        
          useEffect(() => {
  if (trip?.userSelection?.location?.label) {
    GetPlacePhoto();
  } else {
    console.warn("Missing hotelName in trip:", trip);
  }
}, [trip]);

        
          const GetPlacePhoto=async()=>{
            const data={
              textQuery: trip?.userSelection?.location?.label
            }
            const result= await GetPlaceDetails(data).then(resp=>{
              console.log("resp"+resp.data.places[0].photos[0].name);
              const photoUrl=PHOTO_REFERENCE_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
              console.log(photoUrl);
              setPhotoUrl(photoUrl);
            })
          }
  return (
    <Link to={`/view-trip/${trip.id}`} className='no-underline text-black'>
    <div className='hover:scale-105 hover:shadow-lg transition-all cursor-pointer'>
        <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className='object-cover rounded-xl h-[300px] w-[300px] ' />
        <div>
            <h2 className='font-bold text-xl mt-3'>
                {trip.userSelection.location.label}
            </h2>
            <h2 className='text-gray-500 text-sm'>{trip.userSelection.noofdays} Days trip with {trip.userSelection.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCard