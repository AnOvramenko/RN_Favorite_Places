import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../globalStyles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { CoordinatesWithAddress } from "../../types/place";
import { Place } from "../../models/place";


interface PlaceFormProps {
  onCreatePlace: (data: Place) => void;
}

const PlaceForm = ({onCreatePlace}: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState<CoordinatesWithAddress>();
  const [selectedImage, setSelectedImage] = useState("");

  const handleTitleInput = (title: string) => {
    setEnteredTitle(title);
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location: CoordinatesWithAddress) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {

    if (!enteredTitle || !selectedImage || !pickedLocation) {
      return;
    }

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation, 0);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={handleTitleInput}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler}/>
      <LocationPicker onPickLocation={pickLocationHandler}/>
      <Button onPress={savePlaceHandler}>Submit</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
