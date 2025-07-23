import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../globalStyles";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "../../utils/location";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigation/types";
import { CoordinatesWithAddress } from "../../types/place";



interface LocationPickerProps {
  onPickLocation: (location: CoordinatesWithAddress) => void;
}

const LocationPicker = ({onPickLocation}: LocationPickerProps) => {
  const [pickedLocation, setPickedLocation] = useState<{lat: number, lng: number}>();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'AddPlace'>>();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const mapPickedLocation = route.params && {lat: route.params.coordinates.lat, lng: route.params.coordinates.lng};

  const verifyPermissions = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
    }
  }, [route]);

  useEffect(() => {

    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation);
        onPickLocation({...pickedLocation, address});
      }

    }

    handleLocation();
  }, [pickedLocation, onPickLocation])

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} style={styles.image}/>
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          Locate user
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon="map">
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
