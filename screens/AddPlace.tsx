import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../types/place";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../navigation/types";
import { insertPlace } from "../utils/database";

const AddPlace = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };
  
  return <PlaceForm onCreatePlace={createPlaceHandler}/>;
};

export default AddPlace;

const styles = StyleSheet.create({});
