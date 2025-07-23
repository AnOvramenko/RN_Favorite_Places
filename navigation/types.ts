import { Coordinates, Place } from "../types/place";

export type RootParamList = {
  AllPlaces: undefined;
  AddPlace: { coordinates: Coordinates } | undefined;
  Map: Coordinates | undefined;
  PlaceDetails: {placeId: number};
};
