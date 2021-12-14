import React from 'react'
import { useDispatch } from 'react-redux'
import { setTypeOfStep, setEmptyValuesForRouteMarkersCoordinates, setIsSetCurrentLocationTitle, setSelectedCarData, setSelectedCarDriverData } from '../../../store_redux/mapDataSlice'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ClearRouteMarkersBtn({setIsCanCreateRoute, setNextStepStatus, setIsShowFormsForCreationRoute, setShowRouteInfoBtn, setIsTripRouteBuilt}) {
    const dispatch = useDispatch()

    const RemoveRouteData = () => {
        setShowRouteInfoBtn(false)
        setNextStepStatus(false) // for collapse 'SelectDriverAndCarForm'
        setIsCanCreateRoute(false)
        /* For 'LaunchRouteForm */
        dispatch(setEmptyValuesForRouteMarkersCoordinates())
        dispatch(setTypeOfStep({typeOfStep: 'From'}))
        dispatch(setIsSetCurrentLocationTitle({isSetCurrentLocationTitle: false}))
        /* For 'SelectDriverAndCarForm' */
        dispatch(setSelectedCarData(
            { 
                selectedCarData: {
                    car_title: 'Car',
                    cost: 'cost',
                    photo_url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550876.png?token=exp=1639404512~hmac=b1f4bcd6cd956390697b8b5173822599'
                }
            }
        ))
        dispatch(setSelectedCarDriverData(
            { 
                selectedCarDriverData: {
                    name: 'Driver',
                    age: 'age',
                    photo_url: 'https://cdn-icons.flaticon.com/png/512/122/premium/122447.png?token=exp=1639404563~hmac=78800406b6bfabb5a31e76e66fbf9e39',
                }
            }
        ))
        setIsShowFormsForCreationRoute(true)
        setIsTripRouteBuilt(false)
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
