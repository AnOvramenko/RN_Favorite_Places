import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Place } from "../../types/place";
import { Colors, IosShadows } from "../../globalStyles";

interface PlaceItemProps {
  place: Place;
  onPress: () => void;
}

const PlaceItem = ({ place, onPress }: PlaceItemProps) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.item, pressed && styles.pressed]}>
      <Image source={{uri: place.imageUri}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    ...IosShadows,

  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },

});
