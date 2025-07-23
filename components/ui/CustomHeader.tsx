import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../globalStyles";

export interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: {
    name: React.ComponentProps<typeof AntDesign>["name"];
    onPress: () => void;
  };
}

const CustomHeader = ({ title, showBackButton = true, rightIcon }: CustomHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row', gap: 16}}>
        {showBackButton && (
        <Pressable onPress={navigation.goBack} style={styles.icon}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && (
        <Pressable onPress={rightIcon.onPress} style={styles.icon}>
          <AntDesign name={rightIcon.name} size={24} color="black" />
        </Pressable>
      )}
      
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary500,
  },
  icon: {
    width: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});