import React, { useEffect, useState, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../../firebase';


export default function MainAppPart(/*{navigation}*/) {
  
    return (
        <SafeAreaView style={styles.container}>
            {/* <WalletScreen /> */}
            {/* <DrawerNavAside /> */}
            {/* <MapViewScreen /> */}
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
})
