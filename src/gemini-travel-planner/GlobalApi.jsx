import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key':import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask':['places.photos','places.displayName','places.id']
    }
}
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
export const PHOTO_REFERENCE_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
