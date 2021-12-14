import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { setTypeOfStep, GetCurrentLocation, setRouteMarkersCoordinates, setIsSetCurrentLocationTitle } from '../../../store_redux/mapDataSlice'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import SearchField from './SearchField'

export default function LaunchRouteForm({setIsCanCreateRoute, nextStepStatus, setNextStepStatus, isShowFormsForCreationRoute }) {
    const dispatch = useDispatch()

    /* Get location info after clicking on 'Current location' button */
    const currentLocation = useSelector(state => state.mapData.currentLocation)

    /* Get current 'type of step' while setuping locations in first form  */
    const typeOfStep = useSelector(state => state.mapData.typeOfStep)

    /* Show/hidden first form */
    const [isBlockCollapsed, setIsBlockCollapsed] = useState(true)
    
    // Getting current location
    useEffect(async () => {
        await dispatch(GetCurrentLocation())
    }, [])

    useEffect(() => {
        if (!nextStepStatus) setIsBlockCollapsed(true)
    }, [nextStepStatus])
    
    const getCurrentLocation = async () => {
        if (currentLocation != null ) {
             // console.log(currentLocation)
            /* Setup current location info as data for first marker  */
            dispatch(setRouteMarkersCoordinates(
                {
                    index: 0, 
                    title: 'My location',
                    latlng: {
                        lat: currentLocation.latitude,
                        lng: currentLocation.longitude
                    }
                }
            ))
            dispatch(setIsSetCurrentLocationTitle({isSetCurrentLocationTitle: true}))
        }
    }

    const nextStep_2_BtnClick = () => {
        setIsBlockCollapsed(false) 
        setNextStepStatus(true)
    }

    if (!currentLocation) {
        return <ActivityIndicator size={'large'} color="yellow"/>
    }

    if (isShowFormsForCreationRoute)
        return (
            <View style={[styles.container, {height: isBlockCollapsed ? 280 : 65}]}>
                <View style={styles.header}>
                    <Text style={styles.caption}>
                        Where are you going?
                    </Text> 

                    <TouchableOpacity style={styles.collapseBtnWrapper} onPress={() => setIsBlockCollapsed(prev => !prev) }>
                        {   isBlockCollapsed 
                            ? 
                            <AntDesign name="upcircleo" size={20} color="#fcba03" />
                            :
                            <AntDesign name="downcircleo" size={20} color="#fcba03" />
                        }
                    </TouchableOpacity>
                </View>

                {
                    isBlockCollapsed ?  <SearchField /> : console.log()
                }
            
                {
                    typeOfStep == 'From' && isBlockCollapsed
                    ?
                        <View style={styles.stepWrapper}>
                            <TouchableOpacity style={[styles.myCurrentLocationBtn]} onPress={() => getCurrentLocation() }>
                                <Text style={styles.myCurrentLocationBtn_caption}>
                                    •  My current location
                                </Text>
                            </TouchableOpacity>

                            {/* <SearchField />  */}

                            <TouchableOpacity style={styles.operationBtn} onPress={() => dispatch(setTypeOfStep({typeOfStep: 'To'})) }>
                                <Text style={styles.operationBtn_caption}>
                                    Next step (1)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    : typeOfStep == 'To' && isBlockCollapsed
                    ? 
                        <View style={styles.stepWrapper}>
                            <TouchableOpacity style={[styles.myCurrentLocationBtn, {display: 'none'}]}>
                                <Text style={styles.myCurrentLocationBtn_caption}>
                                    •  My current location
                                </Text>
                            </TouchableOpacity>

                            {/* <SearchField />  */}

                            <TouchableOpacity style={styles.operationBtn} onPress={() => nextStep_2_BtnClick()}>
                                <Text style={styles.operationBtn_caption}>
                                    Next step (2)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    : <View></View>
                }
            </View>
        )
    else
        return (<View></View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255, 0.6)',
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        width: '90%',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 12, 
    },
    caption: {
        width: '100%',
        color: '#575757',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
    },
    collapseBtnWrapper: {

    },
    stepWrapper: {
        width: '100%'
    },
    myCurrentLocationBtn:{
        paddingVertical: 15, 
        paddingHorizontal: 15, 
        borderColor: '#fcba03',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginTop: 80,
        width: '100%',
        backgroundColor: 'rgba(252, 186, 3, 0.5)'
    },
    myCurrentLocationBtn_caption:{
        color: '#575757',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
    },
    operationBtn:{
        paddingVertical: 15, 
        backgroundColor: '#fcba03',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        zIndex: 2,
        marginTop: 40
    },
    operationBtn_caption:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
    }
})
