import { Button, FlatList, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, Ref, SetStateAction } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { color, font } from '../assets/Assets';
import { server_data_obj } from '../screens/Home';

interface props {
    bottomSheetRef: Ref<BottomSheet> | undefined;
    snapPoints: Array<string | number>;
    handleSheetChanges: (index: number) => void;
    handleClosePress?: ((event?: GestureResponderEvent) => void|undefined) | undefined;
    data: server_data_obj[];
    currentServer: server_data_obj
    setCurrentServer:Dispatch<SetStateAction<server_data_obj>>
}

const ActionSheet = (props: props) => {
    const { bottomSheetRef, snapPoints, handleSheetChanges, handleClosePress, data, currentServer, setCurrentServer } = props;

    const handleServerChange:(e:server_data_obj)=>void = (serverObj) => {
        setCurrentServer(serverObj);
        if(handleClosePress) {
            setTimeout(() => {
                handleClosePress()
            }, 10);
            }
    }

    const RenderItem = ({ item, index }:{item:server_data_obj,index:number}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleServerChange(item)}
            style={styles.item}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.tx}>{item.name}</Text>
            {
                item.id === currentServer.id ? <View style={styles.check} /> : null
            }

        </TouchableOpacity>
    )
    const keyExtractor = (item:server_data_obj, index:number) => item.name + index
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={styles.contentContainer} >
                <Text>Pick Your Server</Text>
                <FlatList
                    data={data}
                    renderItem={RenderItem}
                    keyExtractor={keyExtractor}
                />
                <Button title='close' onPress={handleClosePress} />
            </View>
        </BottomSheet>
    )
}

export default ActionSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        minHeight: 10,
        minWidth: "90%",
        // marginVertical:5,
        paddingVertical: 10,
        flexDirection: "row",
    },
    tx: {
        fontFamily: font.semiBold,
        color: "#000",
        textTransform: "capitalize",
        fontSize: 17

    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    check: {
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: color.primary,
        position: "absolute",
        right: 10,
        top: 10,
    }
})