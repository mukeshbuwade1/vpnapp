import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

const ActionSheet = (props) => {
    const { bottomSheetRef, snapPoints, handleSheetChanges, handleClosePress, data } = props;

    const RenderItem = ({ item, index }) =>(
        <View style={styles.item}>
            {/* <Image source={item.icon}  /> */}
            <Text>{item.name}</Text>
        </View>
    )
    const keyExtractor = (item, index) => item.name + index
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
    item:{
        backgroundColor:"red",
        minHeight:10,
        minWidth:"90%",
        // marginVertical:5,
        paddingVertical:10
    }
})