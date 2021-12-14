import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ShowRouteInfoBtn({isTripRouteBuilt, showRouteInfoBtn, setShowRouteInfoBtn}) {
    const [isClickedShowRouteInfo, setIsClickedShowRouteInfo] = useState(false)

    const ShowRouteInfo = (status) => {
        setIsClickedShowRouteInfo(status)
        setShowRouteInfoBtn(status)
    }

    return ( 
        isTripRouteBuilt  
        ?
            <TouchableOpacity style={[styles.container, {opacity: isClickedShowRouteInfo ? 0.3 : 1}]} onPress={() => ShowRouteInfo(prev => !prev) }>
                <Image
                    style={styles.icon_img} 
                    source={require('../../../assets/images/MainAppPartScreens/MapViewScreen/route_info-icon.png')}
                />
            </TouchableOpacity>
        : <View></View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#fcba03',
        borderWidth: 1,
        borderRadius: 50,
        position: 'absolute',
        left: 20,
        bottom: 20,
        zIndex: 3
    }, 
    icon_img: {
        width: 30,
        height: 30
    }
})
