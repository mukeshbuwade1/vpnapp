import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import ButtonForHome from '../components/ButtonForHome'
import { height } from '../constants/methods'
import Lottie from 'lottie-react-native';
import { color, img } from '../assets/Assets'

const stateName = {
  connected: "connected",
  connecting: "connecting",
  disconnected: "disconnected",
}

const Home = () => {
  const [state, setState] = useState(stateName?.disconnected);
  console.log("state",state)
  const go = useRef<Lottie>(null)
  const done = useRef<Lottie>(null)

  function createConnection() {
    setState(stateName.connecting);
    setTimeout(() => {
      setState(stateName.connected);
      done.current?.play()
    }, 2000);
  }
  const handleChange = () => {
    if (state == stateName.disconnected) {
      createConnection()
    }
    else {
      console.log("d")
      setState(stateName.disconnected);
      go.current?.play()
    }

  }
  useEffect(()=>{
    go.current?.play()
  },[])
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.mainView}>

        {/* active mode indicator */}
        <CustomButton
          indicator={true} indicatorState={state == stateName?.connected ? true : false}
          boxStyle={{ ...styles.boxStyle, backgroundColor: "#fff", ...styles.shadow, minHeight: 30, }}
          textStyle={{ ...styles.textStyle, textTransform: "capitalize", color: "#000", }}
          title={state == stateName.connected ? "connected" : 'disconnected'} />

        {/* animation view  */}
        <View style={styles.animationBox}>
          {
            state == stateName.connected ? <Lottie source={img.done} ref={done} loop={false} /> :
              state == stateName.connecting ? <Lottie source={img.connecting} autoPlay loop /> :
                <Lottie source={img.go} ref={go} loop={false} />
          }

        </View>

        {/* action button  */}
        <CustomButton
          onPress={handleChange}
          boxStyle={{...styles.boxStyle, backgroundColor:state == stateName.connected? "red":color.primary}}
          textStyle={{ ...styles.textStyle,}}
          title={state == stateName.connected ? "disconnect" : 'connect now'} />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: height - 40
  },
  boxStyle: {
    width: "40%",
  },
  textStyle: {
    fontSize: 14,
  },
  shadow: {
    elevation: 5
  },
  animationBox: {
    width: 250,
    height: 250,
    marginVertical: 20
  }
})