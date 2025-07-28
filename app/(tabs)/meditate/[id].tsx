import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

// import de las metitaiton images
import AppGradient from "@/components/AppGradient";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { router, useLocalSearchParams } from "expo-router";

// import vector icon
import { CustomButton } from "@/components/CustomButton";
import { AntDesign } from "@expo/vector-icons";

// import audio
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";
import { Audio } from "expo-av";

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  //audio
  const [audio, setAudio] = useState<Audio.Sound | null>(null);

  useMemo(() => {
    // Reset the timer when the component mounts or id changes
    setSecondsRemaining(10);
    setIsMeditating(false);
  }, [id]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit
    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      // Start the meditation countdown
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [secondsRemaining, isMeditating]);

  const toggleMeditationSessionStatus = async () => {
    if (isMeditating) {
      // Stop the meditation session
      await Audio.setIsEnabledAsync(false);
    } else {
      // Start the meditation session
      await Audio.setIsEnabledAsync(true);
    }
    toggleSound();
    setIsMeditating(!isMeditating);
    setSecondsRemaining(10); // Reset the timer when starting a new session
    setIsPlayingAudio(false); // Reset audio state when starting a new session
    await initializeAudio(); // Initialize audio when starting a new session
  };

  const initializeAudio = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[`${audioFileName}`]
    );
    setAudio(sound);
    return sound;
  };

  const toggleSound = async () => {
    const sound = audio ? audio : await initializeAudio();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && status?.isPlaying) {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    } else {
      await sound.playAsync();
      setIsPlayingAudio(true);
    }
  };

  // Format the time left to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable
            onPress={() => {
              router.back();
            }}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Start Meditation"
              onPress={() => {
                toggleMeditationSessionStatus();
              }}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
