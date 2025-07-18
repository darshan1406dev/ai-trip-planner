import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../gemini-travel-planner/firebaseConfig';
import UserTripCard from './components/UserTripCard';

function MyTrips() {

        const navigation = useNavigation();
        const [userTrip,setUserTrip] = useState([]);


    useEffect(() => {
        getUserTrips();
    }, []);
const getUserTrips = async() => {
    const user= JSON.parse(localStorage.getItem('user'));
    if (!user) {
        navigation('/'); 
        return;
    }
    
    const q=query(collection(db, "AITrips"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    setUserTrip([]);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
setUserTrip((prevTrips) => [...prevTrips, { id: doc.id, ...doc.data() }]);
    });
}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20 '>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        { userTrip.length>0?userTrip.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
        ))
    :[1,2,3,4,5,6].map((trip, index) => (
        <div key={index} className='animate-pulse h-[300px] w-full bg-slate-200 rounded-xl'>

        </div>
    ))}
        </div>
    </div>
  )
}

export default MyTrips