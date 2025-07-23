# 📍 React Native Favorite Places

A mobile application built with **React Native**, allowing users to save and view their favorite places on a map. Built using Expo, SQLite, and custom components with React Navigation.

## 🔧 Features

- 📸 Add new places with a title, photo, and geolocation
- 🗺️ View saved places on an interactive map
- 📍 Automatically retrieve current location or pick a location manually
- 🗃️ Persistent storage using SQLite
- 🧭 Navigation between screens using React Navigation
- 🎯 TypeScript support

## 🧰 Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **SQLite (expo-sqlite)**
- **React Navigation**
- **Expo Location & Image Picker**

## 📷 Screenshots

<p align="center">
  <img src="assets/screenshots/AllPlaces.png" alt="All Places Screen" width="250" style="margin: 10px;" />
  <img src="assets/screenshots/AddPlaceEmpty.png" alt="Add Place Screen (Empty)" width="250" style="margin: 10px;" />
  <img src="assets/screenshots/AddPlaceFilled.png" alt="Add Place Screen (Filled)" width="250" style="margin: 10px;" />
  <img src="assets/screenshots/PlaceDetail.png" alt="Place Detail Screen" width="250" style="margin: 10px;" />
  <img src="assets/screenshots/Camera.png" alt="Camera" width="250" style="margin: 10px;" />
  <img src="assets/screenshots/Map.png" alt="Map" width="250" style="margin: 10px;" />
</p>


## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/AnOvramenko/RN_Favorite_Places.git
cd RN_Favorite_Places
```

2. Install dependencies
```bash
npm install
```

3. Start the app with Expo
```bash
npx expo start
```

📍 Permissions
This app uses the following permissions:

- Location access (to get current position)
- Media library (to pick images) and camera

Make sure to allow them when prompted.