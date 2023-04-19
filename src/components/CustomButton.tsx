import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { color, font } from '../assets/Assets';

interface props {
  title: string;
  boxStyle?: object;
  textStyle?: object;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  indicator?: boolean;
  indicatorState?: boolean;
}

const CustomButton = ({ title, boxStyle, textStyle, onPress, indicatorState, indicator }: props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.box, ...boxStyle
      }}>
      <Text style={{
        ...styles.text, ...textStyle
      }}>{title}</Text>
      {
        indicator && <View style={{ ...styles.indicatorBox, backgroundColor: indicatorState ? color.primary : "#444" }} />
      }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  indicatorBox: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 5
  }
})