import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import ButtonForHome from '../components/ButtonForHome'
import { height } from '../constants/methods'
import Lottie from 'lottie-react-native';
import { color, img } from '../assets/Assets'
import BottomSheet from '@gorhom/bottom-sheet';
import ActionSheet from '../components/ActionSheet'

const stateName = {
  connected: "connected",
  connecting: "connecting",
  disconnected: "disconnected",
}

const server_data = [
  {
    name: "auto",
    icon: img.globe,
  },
  {
    name: "canada",
    icon: img.canada,
  },
  {
    name: "india",
    icon: img.india,
  },
  {
    name: "russia",
    icon: img.russia,
  },
  {
    name: "united states",
    icon: img['united-states'],
  },
]

const Home = () => {
  const [state, setState] = useState(stateName?.disconnected);
  const [currentServer, setCurrentServer] = useState(server_data[0]);
  console.log("currentServer",currentServer)
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
  useEffect(() => {
    go.current?.play()
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current.close()
  const handleOpenPress = () => bottomSheetRef.current.expand()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header  currentServer={currentServer}
        icon={currentServer.icon}  onpressRightIcon={handleOpenPress}/>

      <View style={styles.mainView}>

        {/* active mode indicator */}
        <CustomButton
          indicator={true} indicatorState={state == stateName?.connected ? true : false}
          boxStyle={{ ...styles.boxStyle, backgroundColor: "#fff", ...styles.shadow, minHeight: 30, }}
          textStyle={{ ...styles.textStyle, textTransform: "capitalize", color: "#000", }}
          title={state == stateName.connected ? "connected" : 'disconnected'} 
         
          
          />

        {/* animation view  */}
        <View style={styles.animationBox}>
          {
            state == stateName.connected ? <Lottie source={img.done} ref={done} loop={false} /> :
              state == stateName.connecting ? <Lottie source={img.connecting} style={{ width: "85%" }} autoPlay loop /> :
                <Lottie source={img.go} style={{ width: "85%" }} ref={go} loop={false} />
          }

        </View>

        {/* action button  */}
        <CustomButton
          onPress={handleChange}
          boxStyle={{ ...styles.boxStyle, backgroundColor: state == stateName.connected ? "red" : color.primary }}
          textStyle={{ ...styles.textStyle, }}
          title={state == stateName.connected ? "disconnect" : 'connect now'} />
      </View>
      <ActionSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        handleClosePress={handleClosePress}
       data={server_data}
      />
     
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
    // marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },

})