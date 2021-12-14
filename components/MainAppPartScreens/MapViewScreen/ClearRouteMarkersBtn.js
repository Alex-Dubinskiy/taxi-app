import React from 'react'
import { useDispatch } from 'react-redux'
import { setTypeOfStep, setEmptyValuesForRouteMarkersCoordinates, setIsSetCurrentLocationTitle } from '../../../store_redux/mapDataSlice'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ClearRouteMarkersBtn({setIsCanCreateRoute}) {
    const dispatch = useDispatch()

    const RemoveRouteData = () => {
        setIsCanCreateRoute(false)
        dispatch(setEmptyValuesForRouteMarkersCoordinates())
        dispatch(setTypeOfStep({typeOfStep: 'From'}))
        dispatch(setIsSetCurrentLocationTitle({isSetCurrentLocationTitle: false}))
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => RemoveRouteData() }>
            <Image
                style={styles.icon_img} 
                source={require('../../../assets/images/MainAppPartScreens/MapViewScreen/remove_route-icon.png')}
            />
        </TouchableOpacity>
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
        right: 20,
        bottom: 20,
        zIndex: 3
    }, 
    icon_img: {
        width: 30,
        height: 30
    }
})
