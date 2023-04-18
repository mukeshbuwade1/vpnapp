import { Alert, Button, FlatList, Image, ImageSourcePropType, ListRenderItem, NativeScrollEvent, NativeScrollPoint, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../constants/methods';
import { font } from '../assets/Assets';
import CustomButton from "../components/CustomButton"
interface ItemT {
    title: string;
    subtitle: string;
    image: ImageSourcePropType;
}

const keyExtractor: ((item: ItemT, index: number) => string) | undefined = (item, index) => item.title + index

const renderItems: ListRenderItem<ItemT> | null | undefined = ({ item, index }) => {
    return (
        <View style={styles.imageContainer}>
            <Image source={item.image} alt={item.title} style={styles.image} resizeMode={"contain"} />
        </View>
    )
}

let data = [
    {
        title: 'React Native 1',
        subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
        image: require('../assets/images/Security.png'),
    },
    {
        title: 'React Native 2',
        subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
        image: require('../assets/images/Security.png'),
    },
    {
        title: 'React Native 3',
        subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
        image: require('../assets/images/Security.png'),
    },
]

const Onboarding = () => {

    const [scrollOffset, setScrollOffset] = useState<{ index: number, x: number }>({ index: 0, x: 0 })

    const onScroll = (scrollState: NativeSyntheticEvent<NativeScrollEvent>) => {
        let x_axis = Math.floor(Number(scrollState.nativeEvent.contentOffset.x))
        let w = Math.floor(width)
        if (scrollOffset.x + w == x_axis) {
            setScrollOffset({ index: scrollOffset.index + 1, x: x_axis })
        }
        if (scrollOffset.x - w === x_axis) {
            setScrollOffset({ index: scrollOffset.index - 1, x: x_axis })
        }
    }

    const renderDots: ListRenderItem<ItemT> | null | undefined = ({ item, index }) => {
        return (
            <View style={{ ...styles.dot ,  backgroundColor: index == scrollOffset.index ? "#555" : "#aaa" }} />
        )
    }

    return (
        <View style={styles.center} >

            {/* image view  */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItems}
                onScroll={onScroll}
            />
            {/* text info view  */}
            <View style={{...styles.center, paddingHorizontal:30}}>
                <Text style={styles.h2}>{data[scrollOffset.index].title}</Text>
                <Text style={styles.text}>{data[scrollOffset.index].subtitle}</Text>
            </View>
            {/* slide  indicator view  */}
            <FlatList            
                horizontal
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderDots}
            />
            {/* next/get start button view  */}
          <CustomButton title={  'get start'} boxStyle={{width:"50%", marginTop:9}}  />
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "80%",
        // height: 100,
    },
    h2: {
        fontFamily: font.bold,
        fontSize: 23,
    },
    text: {
        fontSize: 16,
        fontFamily: font.medium,
        textAlign:"center"
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginHorizontal:5, 
        marginVertical:10
    },
    imageContainer: {
        width: width,
        height: height * 0.75,
        justifyContent: "center",
        alignItems: 'center',
    }
})