import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'

export default function CustomDrawer(props) {
    const handleSignOut = () => {
        // Update auth data in Async Storage

        // For old auth checking
        // let updatedAuthUserDataObj = {}
        // getData('user_data').then(res => updatedAuthUserDataObj = {...res, isAuth: false})
        // storeData('user_data', updatedAuthUserDataObj)

        signOut(auth)
        .then(() => {
            props.navigation.replace('StartScreen')
        })
        .catch(error => console.log(error.message))
    }

    return (
        <View style={styles.container}>
            <LinearGradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={['#FF8008', '#FFC837']} 
                style={styles.header}>
                
                <View style={styles.icon_img_wrapper}> 
                    <Image
                        style={styles.icon_img} 
                        source={require('../../assets/images/MainAppPartScreens/MapViewScreen/carDriver-icon.png')}
                    />
                </View>
                
                <Text style={styles.authUserName}> Max Petrov </Text> 
            </LinearGradient>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <TouchableOpacity style={styles.signOutBtn_wrapper} onPress={() => handleSignOut()}>
                <Ionicons name="exit-outline" size={24} color="rgba(255,255,255,0.7)" />
                <Text style={styles.signOutBtn_text}>Sing out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#f7f7f7'
    },
    /* Header */
    header: {
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: '#fcba03',
        height: 160,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_img_wrapper: {
        padding: 0,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff'
    },
    icon_img: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    authUserName: {
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
        marginLeft: 15,
        color: '#fff'
    },
    /* Body */

    /* Footer */
    signOutBtn_wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        borderColor: 'rgba(255,255,255,0.7)',
        borderWidth: 1,
        borderRadius: 15
    },
    signOutBtn_text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
        marginLeft: 15,
    }
})
