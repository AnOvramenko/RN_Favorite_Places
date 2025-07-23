import { Place } from "../models/place";
import { DBPlace } from "../types/place";

export const convertPlaceDataFromDBToUI = (place: DBPlace) => {
    return new Place(
      place.title,
      place.imageUri,
      { address: place.address, lat: place.lat, lng: place.lng },
      place.id
    );
};
