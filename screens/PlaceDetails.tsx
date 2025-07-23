import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootParamList } from "../navigation/types";
import { deletePlace, fetchPlaceDetails } from "../utils/database";
import { Place } from "../types/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const PlaceDetails = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place>()
  const route = useRoute<RouteProp<RootParamList, 'PlaceDetails'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const selectedPlaceId = route.params.placeId;

  const showOnMapHandler = () => {
    if (selectedPlace) {
      navigation.navigate('Map', {lat: selectedPlace.location.lat, lng: selectedPlace.location.lng});
    }
  };

  const onDeletePlaceHandler = async () => {
    await deletePlace(selectedPlaceId);
    navigation.navigate('AllPlaces');
  };

  useEffect(() => {
    const getPlaceDetail = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setSelectedPlace(place);
      navigation.setOptions({
        title: place?.title,
      })
    }

    getPlaceDetail();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackMsg}>
          Loading place data...
        </Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
        <OutlinedButton icon="trash" onPress={onDeletePlaceHandler} color="#c54c4c">
          Delete
        </OutlinedButton>
        </View>

      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackMsg: {
    fontSize: 18,
  },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
