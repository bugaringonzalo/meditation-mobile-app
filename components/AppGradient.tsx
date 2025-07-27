import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ColorValue } from "react-native";

import Content from "./Content";

const AppGradient = ({
  children,
  colors,
}: {
  children: any;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
}) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
