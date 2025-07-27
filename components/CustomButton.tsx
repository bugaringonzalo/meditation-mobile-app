import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  textStyles?: string;
  containerStyles?: string;
}

export class CustomButton extends Component<CustomButtonProps> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        className={`${this.props.containerStyles || ""} bg-white rounded-xl min-h-[62px] justify-center items-center`}
        activeOpacity={0.7}
      >
        <Text
          className={`${this.props.textStyles || ""} font-semibold text-lg text-center`}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default CustomButton;
