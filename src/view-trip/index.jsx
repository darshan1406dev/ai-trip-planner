import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { db } from '../gemini-travel-planner/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from './components/info';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function ViewTrip() {
    const {tripId} = useParams();
    const[trip, setTrip] = useState(null);

    useEffect(() => {
        if(tripId) {
            GetTripData();
        } else {
            toast.error("No trip ID provided!");
        }
    }, [tripId]);

    const GetTripData=async()=>{
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document!");
            toast.error("No such trip found!");
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-48 xl:px-56 mt-20'>
        {/* Information about the trip */}
        <InfoSection trip={trip} />
        {/*Recommended Hotels*/}
        <Hotels trip={trip} />
        {/*Daily Plan*/}
        <PlacesToVisit trip={trip} />

        {/*Footer*/}
        <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip