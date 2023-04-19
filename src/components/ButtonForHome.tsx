import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { font } from '../assets/Assets';

interface props {
  title: string;
  boxStyle?: object;
  textStyle?: object
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ButtonForHome = ({ title, boxStyle, textStyle, onPress }: props) => {
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

export default ButtonForHome

const styles = StyleSheet.create({
  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    minHeight: 40
  },
  text: {
    fontSize: 16,
    fontFamily: font.medium,
    textTransform: "uppercase"
  },
})