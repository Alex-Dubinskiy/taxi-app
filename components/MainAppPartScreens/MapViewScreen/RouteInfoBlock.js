import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function RouteInfoBlock({ showRouteInfoBtn }) {
    /* Get values ... */
    const routeMarkersCoordinates = useSelector(state => state.mapData.routeMarkersCoordinates)

    /* Local data */
    const selectedCarData = useSelector(state => state.mapData.selectedCarData)
    const selectedCarDriverData = useSelector(state => state.mapData.selectedCarDriverData)

    return (
        showRouteInfoBtn 
        ?
            <View style={[styles.container, { height: showRouteInfoBtn ? 250 : 0 }]}>
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
                                {selectedCarData.cost} $
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
})
