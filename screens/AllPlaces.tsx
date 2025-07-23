import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../types/place";
import { fetchPlaces } from "../utils/database";
import { ActivityIndicator, View } from "react-native";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
  useEffect(() => {
    const loadPlaces = async () => {
      if (isFocused) {
        const places = await fetchPlaces();
        setLoadedPlaces(places as Place[]);
    }

    setIsLoading(false);
    }

    loadPlaces();
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
