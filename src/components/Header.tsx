import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { font, img } from '../assets/Assets'

const Header = () => {
  return (
    <View style={{ ...styles.header }}>
      <View style={{ ...styles.iconBox }}>
        <Image source={img.menu} alt={"menu icon"} style={styles.menuIconStyle} />
      </View>
      <Text style={styles.headerTextStyle}>{"VPN"}</Text>
      <View style={{ ...styles.iconBox }} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 25,
    height: 25,
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: font.semiBold,
    textAlign: "center",
  },
})