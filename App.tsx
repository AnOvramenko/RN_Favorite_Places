import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/Navigation";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  

  useEffect(() => {
    const prepare = async () => {
      try {
        await init();
      } catch (error) {
        console.log("DB init error", error);
      } finally {
        SplashScreen.hideAsync();
        setIsAppReady(true);
      }
    };

    prepare();
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}
