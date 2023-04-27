import { Button, ImageProps, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import ButtonForHome from '../components/ButtonForHome'
import { height } from '../constants/methods'
import Lottie from 'lottie-react-native';
import { color, img } from '../assets/Assets'
import BottomSheet from '@gorhom/bottom-sheet';
import ActionSheet from '../components/ActionSheet'
import {
  VpnState,
  CharonErrorState,
  connect,
  disconnect,
  getCharonErrorState,
  getCurrentState,
  getConnectionTimeSecond,
  onStateChangedListener,
  prepare,
} from 'react-native-vpn-ipsec';

const stateName = {
  connected: "connected",
  connecting: "connecting",
  disconnected: "disconnected",
}

const server_data = [
  {
    id: 1,
    name: "auto",
    icon: img.globe,
  },
  {
    id: 2,
    name: "canada",
    icon: img.canada,
  },
  {
    id: 3,
    name: "india",
    icon: img.india,
  },
  {
    id: 4,
    name: "russia",
    icon: img.russia,
  },
  {
    id: 5,
    name: "united states",
    icon: img['united-states'],
  },
]

export interface server_data_obj {
  id: number
  name: string,
  icon: ImageSourcePropType
}

const Home = () => {
  const [state, setState] = useState(VpnState[VpnState.disconnected] ?? stateName?.disconnected);
  const [credentials, setCredentials] = useState({
    address: "ord3.gpvpn.com",
    username: "",
    password: "",
    vpnType: "",
    secret: "test",
  });
  const [currentServer, setCurrentServer] = useState(server_data[0]);
  const [charonState, setCharonState] = useState(CharonErrorState[CharonErrorState.NO_ERROR]);
  const go = useRef<Lottie>(null)
  const done = useRef<Lottie>(null)
  useEffect(() => {
    prepare()
      .then(() => console.log('prepared'))
      .catch((err) => {
        // only happen on android when activity is not running yet
        console.log("prep error", err);
        prepare();
      });
    onStateChangedListener((e) => {
      console.log('state changed: ', e);
      setState(VpnState[e.state]);
      setCharonState(CharonErrorState[e.charonState]);
    });
  }, []);

  async function createConnection() {
    setState(stateName.connecting);
    console.log('state changed.......: ', VpnState);
    await connect(
      'example',
      credentials.address,
      credentials.username,
      credentials.password,
      // credentials.vpnType,
      credentials.secret,
      false,
      // 0
    )
      .then(() => { setState(stateName.connected); done.current?.play(); console.log('connected') })
      .catch(console.log)
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

  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header icon={currentServer.icon} onpressRightIcon={handleOpenPress} />

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

        <Button title='force disconnect' onPress={() => {
          disconnect()
            .then(() => console.log('disconnect: '))
            .catch(console.log)
        }} />
      </View>
      <ActionSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        handleClosePress={handleClosePress}
        data={server_data}
        currentServer={currentServer}
        setCurrentServer={setCurrentServer} />

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