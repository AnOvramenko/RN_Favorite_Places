import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AllPlaces from "../screens/AllPlaces";
import AddPlace from "../screens/AddPlace";
import { RootParamList } from "./types";
import { Colors } from "../globalStyles";
import withHeader from "../components/HOC/Header";
import { useNavigation } from "@react-navigation/native";
import Map from "../screens/Map";
import PlaceDetails from "../screens/PlaceDetails";

const Stack = createNativeStackNavigator<RootParamList>();

const StackNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={withHeader(AllPlaces, {
          title: "All Places",
          showBackButton: false,
          rightIcon: {
            name: "plus",
            onPress: () => navigation.navigate("AddPlace"),
          },
        })}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPlace"
        component={withHeader(AddPlace, {
          title: "Add a new place!",
          showBackButton: true,
        })}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
      />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
        title: 'Loading place...'
      }}/>
    </Stack.Navigator>
  );
};

export default StackNavigation;
