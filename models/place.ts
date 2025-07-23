import { CoordinatesWithAddress } from "../types/place";

export class Place {

  address;
  location: { lat: number; lng: number };

  constructor(
    public title: string,
    public imageUri: string,
    location: CoordinatesWithAddress,
    public id: number
  ) {
    this.location = { lat: location.lat, lng: location.lng };
    this.address = location.address;
  }
}
