import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../globalStyles";
import OutlinedButton from "../ui/OutlinedButton";

interface ImagePickerProps {
  onTakeImage: (imageUri: string) => void;
}

const ImagePicker = ({onTakeImage}: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string>();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets?.[0].uri);
    onTakeImage(image.assets?.[0].uri as string)
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image}/>
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">Take image</OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  }
});
