import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";
import { DBPlace } from "../types/place";
import { convertPlaceDataFromDBToUI } from "./helpers";

let database: SQLite.SQLiteDatabase;

export async function init() {
  database = await SQLite.openDatabaseAsync("places.db");
  return await database.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address  TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
  )`
  );
}

export const insertPlace = async ({
  address,
  imageUri,
  location: { lat, lng },
  title,
}: Place) => {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      title,
      imageUri,
      address,
      lat,
      lng
    );

    console.log("Added record with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.log("Error when added", error);
    throw error;
  }
};

export const fetchPlaces = async () => {
  try {
    const places = await database.getAllAsync<DBPlace>("SELECT * FROM places");
    const formattedPlaces = places.map(convertPlaceDataFromDBToUI);

    return formattedPlaces;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchPlaceDetails = async (id: number) => {
  try {
    const place = await database.getFirstAsync<DBPlace>(
      `SELECT * FROM places WHERE id = ?`,
      id
    );

    if (place !== null) {
      const formattedPlace = convertPlaceDataFromDBToUI(place);
      return formattedPlace;
    }
  } catch (error) {
    console.log("FetchPlace", error);
  }
};

export const deletePlace = async (id: number) => {
  try {
    const result = await database.runAsync('DELETE FROM places WHERE id = ?', id);
    console.log(result.changes, result.lastInsertRowId);

    if (result.changes === 0) {
      throw new Error(`Record with ID ${id} does not found`);
    }

    return result.changes;
  } catch (error) {
    console.log('Deleting Error', error)
  }
};