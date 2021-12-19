import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { setCurrentOrderedTransitData } from '../../../store_redux/otherAppDataSlice'

export default function RouteInfoBlock({ showRouteInfoBtn, navigation }) {
    /* Get values ... */
    const routeMarkersCoordinates = useSelector(state => state.mapData.routeMarkersCoordinates)

    /* Local data */
    const selectedCarData = useSelector(state => state.mapData.selectedCarData)
    const selectedCarDriverData = useSelector(state => state.mapData.selectedCarDriverData)

    const dispatch = useDispatch();

    const makeOnOrderBtnClick = () => {
        try {
            dispatch(setCurrentOrderedTransitData({
                id: Date.now().toString(),
                // route
                from: routeMarkersCoordinates[0].title,
                to: routeMarkersCoordinates[1].title,
                // car
                car_title: selectedCarData.car_title,
                car_photo: selectedCarData.photo_url,
                car_cost: selectedCarData.cost,
                // car driver
                car_driver_photo: selectedCarDriverData.photo_url,
                car_driver_name: selectedCarDriverData.name,
                car_driver_age: selectedCarDriverData.age,
            }))
        } catch(e) {
            console.log(e)
        }

        navigation.navigate('CreateOrderScreen')
    }

    return (
        showRouteInfoBtn 
        ?
            <View style={[styles.container, { height: showRouteInfoBtn ? 340 : 0 }]}>
                <View style={styles.header}>
                    <Text style={styles.caption}>
                        Current route info
                    </Text> 
                </View>

                <View style={styles.routeDataWrapper}>
                    <View style={styles.routeItemDataWrapper}>
                        <Text style={styles.routeItemDataCaption}>
                            From:
                        </Text> 

                        <Text style={styles.routeItemDataDirection}>
                            { routeMarkersCoordinates[0].title }
                        </Text> 
                    </View>

                    <View style={styles.routeItemDataWrapper}>
                        <Text style={styles.routeItemDataCaption}>
                            To:
                        </Text> 

                        <Text style={styles.routeItemDataDirection}>
                            { routeMarkersCoordinates[1].title }
                        </Text> 
                    </View>

                    <View style={styles.routeItemDataWrapper}>
                        <Text style={styles.routeItemDataCaption}>
                        Car:
                        </Text> 

                        <View style={styles.routeItemDataDirection_wrapper}>
                            <Image
                                style={styles.icon_img} 
                                source={{uri: selectedCarData.photo_url}}
                            />

                            <Text style={styles.routeItemDataDirection_nameOrTitle}>
                                {selectedCarData.car_title}
                            </Text> 

                            <Text style={styles.routeItemDataDirection_yearsOrCost}>
                                {selectedCarData.cost}
                            </Text> 
                        </View>
                    </View>

                    <View style={styles.routeItemDataWrapper}>
                        <Text style={styles.routeItemDataCaption}>
                            Car driver:
                        </Text> 

                        <View style={styles.routeItemDataDirection_wrapper}>
                            <Image
                                style={styles.icon_img} 
                                source={{uri: selectedCarDriverData.photo_url}}
                            />

                            <Text style={styles.routeItemDataDirection_nameOrTitle}>
                                {selectedCarDriverData.name}
                            </Text> 

                            <Text style={styles.routeItemDataDirection_yearsOrCost}>
                                {selectedCarDriverData.age}
                            </Text> 
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.checkout_btn} onPress={() => makeOnOrderBtnClick()}>
                    <Text style={styles.checkoutBtn_caption}>
                        Make on order →
                    </Text>
                </TouchableOpacity>
            </View>
        : 
            <View></View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        width: '90%',
        position: 'absolute',
        zIndex: 10,
    },
    header: {
        flexDirection: 'row', 
    },
    caption: {
        width: '100%',
        marginBottom: 20,
        color: '#575757',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
    },
    routeDataWrapper: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    routeItemDataWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    routeItemDataCaption: {
        color: '#575757',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'murecho_sBold',
        marginRight: 10
    },
    routeItemDataDirection_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    routeItemDataDirection: {
        color: '#575757',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
    },
    routeItemDataDirection_nameOrTitle: {
        width: '40%'
    },

    routeItemDataDirection_yearsOrCost: {
        textAlign: 'left'
    },
    icon_img: {
        width: 30,
        height: 30,
        borderRadius: 10,
        marginRight: 15
    },
    checkout_btn:{
        paddingVertical: 15, 
        backgroundColor: '#fcba03',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        zIndex: 2,
        marginTop: 20
    },
    checkoutBtn_caption:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
    }
})
