import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Place } from "../../types/place";
import { Colors } from "../../globalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigation/types";

interface PlacesListProps {
  places: Place[];
}

const PlacesList = ({ places }: PlacesListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const onSelectHandler = (placeId: number) => {
    navigation.navigate('PlaceDetails', {placeId})
  };

  if (!places || !places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    )
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={({ item }) => <PlaceItem place={item} onPress={() => onSelectHandler(item.id)}/>}
      keyExtractor={(item) => String(item.id)}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  }
});
