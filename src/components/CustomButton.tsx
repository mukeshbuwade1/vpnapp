import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { font } from '../assets/Assets';

interface props {
  title: string;
  boxStyle?: object;
  textStyle?: object
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CustomButton = ({ title, boxStyle, textStyle, onPress }: props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.box, ...boxStyle
      }}>
      <Text style={{
        ...styles.text, ...textStyle
      }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
    borderRadius: 20,
    minHeight: 40
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: font.medium,
    textTransform: "uppercase"
  },
})