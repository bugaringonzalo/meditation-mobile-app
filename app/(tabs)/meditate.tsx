import React from "react";
import { ImageBackground, Text, View } from "react-native";

// import de las metitaiton images
import MEDITATION_IMAGES from "@/constants/meditation-images";

const Meditate = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[0]}
        resizeMode="cover"
        className="flex-1 justify-center items-center"
      >
        <Text>Meditate</Text>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
