import React, { useEffect, useState, useMemo } from 'react'
import { signOut } from 'firebase/auth'; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import functionsForAsyncStorage from '../../functionsForAsyncStorage';
import { auth } from '../../firebase';
import MapViewScreen from './MapViewScreen/MapViewScreen'


export default function MainAppPart(/*{navigation}*/) {
    const navigation = useNavigation();

    // const { storeData, getData } = functionsForAsyncStorage

    const handleSignOut = () => {
        // Update auth data in Async Storage

        // For old auth checking
        // let updatedAuthUserDataObj = {}
        // getData('user_data').then(res => updatedAuthUserDataObj = {...res, isAuth: false})
        // storeData('user_data', updatedAuthUserDataObj)

        signOut(auth)
        .then(() => {
            navigation.replace('StartScreen')
        })
        .catch(error => console.log(error.message))
    }
  
    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity style={styles.signOutBtn_wrapper} onPress={() => handleSignOut()}>
                <Text style={styles.signOutBtn_text}>Sing out</Text>
            </TouchableOpacity> */}

            <MapViewScreen />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    signOutBtn_wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'green'
    },
    signOutBtn_text: {
        color: '#fff'
    }
})
