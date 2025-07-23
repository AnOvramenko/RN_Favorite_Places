export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  title: string;
  imageUri: string;
  address: string;
  location: Coordinates;
  id: number;
}

export interface CoordinatesWithAddress extends Coordinates {
  address: string;
}

export interface DBPlace {
  id: number;
  title: string;
  address: string;
  lat: number;
  lng: number;
  imageUri: string;
}
