import React from "react";
import { View, StyleSheet } from "react-native";
import CustomHeader, { CustomHeaderProps } from "../ui/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../globalStyles";

interface WithHeaderOptions extends CustomHeaderProps {}

const withHeader = (
  ScreenComponent: React.ComponentType<any>,
  headerOptions: CustomHeaderProps
) => {
  return (props: any) => (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerArea} edges={["top"]}>
        <CustomHeader {...headerOptions} />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <ScreenComponent {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerArea: {
    backgroundColor: Colors.primary500,
  },
});

export default withHeader;
