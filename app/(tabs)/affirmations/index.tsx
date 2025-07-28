import AppGradient from "@/components/AppGradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";

// import affirmations galery from constants
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";

const Affirmations = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with affirmations
          </Text>
          <View className="mt-4">
            {AFFIRMATION_GALLERY.map((gallery) => (
              <GuidedAffirmationsGallery
                key={gallery.title}
                title={gallery.title}
                previews={gallery.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmations;
