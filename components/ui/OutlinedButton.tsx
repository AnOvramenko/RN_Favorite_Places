import { Pressable, StyleSheet, Text, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import React, { ComponentProps } from "react";
import { Colors } from "../../globalStyles";

interface OutlinedButtonProps {
  onPress: () => void;
  icon: ComponentProps<typeof Ionicons>['name'];
  children: React.ReactNode;
  color?: string;
}

const OutlinedButton = ({children, onPress, icon, color = Colors.primary500} : OutlinedButtonProps) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, {borderColor: color },pressed && styles.pressed]}>
      <Ionicons name={icon} size={18} color={color} style={styles.icon}/>
      <Text style={{color}}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500
  },
});
