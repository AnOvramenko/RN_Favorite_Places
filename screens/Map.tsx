import { Alert, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Coordinates } from "../types/place";
import IconButton from "../components/ui/IconButton";

const Map = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'Map'>>();

  const initialLocation = route.params && {
    lat: route.params.lat,
    lng: route.params.lng,
  }
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | undefined>(initialLocation);

  

  const region = {
    latitude: initialLocation ? initialLocation.lat : 50.45,
    longitude: initialLocation ? initialLocation.lng : 30.52,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );

      return;
    }

    navigation.navigate("AddPlace", { coordinates: selectedLocation });
  };

  useLayoutEffect(() => {
    !initialLocation && navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor || "black"}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, selectLocationHandler, initialLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
