import { GestureResponderEvent, Image,  ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color, font, img } from '../assets/Assets'

interface props {
  icon:ImageSourcePropType
  onpressRightIcon:((event: GestureResponderEvent) => void) | undefined

}
const Header = ({ icon,onpressRightIcon }:props) => {
  return (
    <View style={{ ...styles.header }}>
      {/* left icon  */}
      <View style={{ ...styles.iconBox }}>
        <Image source={img.menu} alt={"menu icon"}  style={styles.menuIconStyle} />
      </View>
      {/* page heading */}
      <Text style={styles.headerTextStyle}>{"VPN"}</Text>
      {/* right icon  */}
      <TouchableOpacity style={{ ...styles.iconBox,width: 55, }} onPress={onpressRightIcon} >
        <Text style={styles.dropdownIcon}>&#x2304;</Text>
        <Image source={icon} alt={"active vpn server icon"} style={styles.menuIconStyle} />
      </TouchableOpacity>
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
    flexDirection: "row"
  },
  menuIconStyle: {
    width: 25,
    height: 25,
    resizeMode:"contain"
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: font.semiBold,
    textAlign: "center",
  },
  vpnIconStyle: {

  },
  dropdownIcon: {
    fontSize: 30,
    fontFamily: font.black,
    color: color.primary,
    marginTop:"-22%",
    marginRight:5
  }
})