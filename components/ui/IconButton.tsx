import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  icon: ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string;
  onPress: () => void;
}

const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Ionicons  name={icon} size={size} color={color}/>
      </TouchableOpacity>
    </View> 
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
