import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";

import beachImage from "@/assets/meditation-images/beach.webp";
import AppGradient from "@/components/AppGradient";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex-1 px-1 justify-between">
            <View>
              <Text className="text-center text-white text-3xl font-bold">
                Meditation App
              </Text>
              <Text className="text-center text-white text-regular text-center px-4">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton
                title="Get Started"
                onPress={() => router.push("/nature-meditate")}
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
