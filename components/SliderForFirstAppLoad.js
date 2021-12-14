import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Swiper from "react-native-web-swiper";

export default function SliderForFirstAppLoad({setIsClickedOpenAppBtn_status}) {
    return (
        <View style={styles.container}>
            <Image resizeMode={'cover'} style={styles.bg_image} source={require('../assets/images/AuthorizationScreens/authorization_bg.jpg')} />
            
            <View style={styles.overlapBlock}></View>
            
            <Swiper
                from={0}
                minDistanceForAction={0.1}
                controlsProps={{
                    dotsTouchable: true,
                    prevPos: false,
                    nextPos: false,
                    dotActiveStyle: {backgroundColor: '#fff'}
                }}
                style={styles.swiper}
            >
                <View style={styles.sliderItems}>
                    <Image resizeMode={'contain'} style={{width: '45%', height: '40%'}} source={require('../assets/images/StartScreen/check_fare_taxi-icon.png')} />
                
                    <View style={styles.textWrapper}>
                        <Text style={styles.captionText}>
                            Check fare
                        </Text>

                        <Text style={styles.subCaptionText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. 
                        </Text>
                    </View>
                </View>
                
                <View style={styles.sliderItems}>
                    <Image resizeMode={'contain'} style={{width: '55%', height: '40%'}} source={require('../assets/images/StartScreen/book_a_ride_taxi_icon.png')} />
                    
                    <View style={styles.textWrapper}>
                        <Text style={styles.captionText}>
                            Book a ride
                        </Text>

                        <Text style={styles.subCaptionText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sit amet, consectetur.
                        </Text>
                    </View>
                </View>
                
                <View style={styles.sliderItems}>
                    <Image resizeMode={'contain'} style={{width: '60%', height: '40%'}} source={require('../assets/images/StartScreen/enjoy_you_trip_taxi-icon.png')} />
                    
                    <View style={styles.textWrapper}>
                        <Text style={styles.captionText}>
                            Enjoy you trip
                        </Text>

                        <Text style={styles.subCaptionText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.openAppBtnWrapper} onPress={() => setIsClickedOpenAppBtn_status(true)}>
                        <Text style={styles.openAppBtnText}>
                            Next   →
                        </Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bg_image: {
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
    },
    overlapBlock: {
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor:"rgba(255,255,255, 0.8)",
    },
    swiper: {
        width: '100%', 
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 3
    },
    sliderItems: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"transparent",
        paddingHorizontal: 25,
    },
    textWrapper: {
    },
    captionText: {
        color: '#37395F',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
        marginBottom: 15
    },
    subCaptionText: {
        color: '#37395F',
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'murecho_regular',
    },
    openAppBtnWrapper: {
        borderRadius: 20,
        backgroundColor: 'rgba(67, 71, 98, 0.5)',
        paddingVertical: 11,
        paddingHorizontal: 20,
        marginTop: 50
    },
    openAppBtnText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'murecho_regular',
    }
})
