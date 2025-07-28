import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

// Prevent the splash screen from auto-hiding until the fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading
  }
  if (!fontsLoaded && !error) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
      <Slot />
    </Stack>
  );
}
