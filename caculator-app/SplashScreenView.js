import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "./assets/icon.png";

export default function SplashScreenView() {
    return (
        <View style = {style.container} >
            <View>
                <Image source={Icon} style={style.image}></Image>

            </View>
        </View>
    )
}

const style = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width:  100,
        height: 100,
        resizeMode: "cover",
    }
})