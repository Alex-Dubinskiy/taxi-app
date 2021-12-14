import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, View, Image } from "react-native";
import EnterThePhoneNumberScreen from "./enterThePhoneNumberScreen"
import EnterOtherDataScreen from "./enterOtherDataScreen"
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../../store_redux/authDataSlice'

export default function AuthSlider({storeData, getData}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [activeAuthScreen, setActiveAuthScreen] = useState('EnterPhoneNumberScreen');

    const [userPhone, setUserPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSignUp = (userName_, email_, password_) => {
        if (
            email_.match('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$') 
            &&
            password_.length > 8
        ) {
            createUserWithEmailAndPassword(auth, email_, password_)
            .then(userCredentials => { // if user is Authntificated
                const user = userCredentials.user;
            })
            .catch(error => console.log(error.message))
        }
        else {}
    }

    const handleSignIn = (email_, password_) => {
        signInWithEmailAndPassword(auth, email_, password_)
        .then(userCredentials => { // if user is Authntificated
            const user = userCredentials.user;

            // Writing auth data in Async Storage
            storeData('user_data', {
                email: email_,
                password: password_
                // For old auth checking
                //isAuth: true
            }) 

            // Writing auth status in Redux Storage
            dispatch(setIsAuth({ 
                isAuth: true
            }))  

            navigation.navigate("MainAppPart")
        })
        .catch(error => console.log(error.message))
    }
    
    return (
        <View style={styles.container}>
            <Image resizeMode={'cover'} style={styles.bg_image} source={require('../../assets/images/AuthorizationScreens/authorization_bg.jpg')} />
            
            <View style={styles.sliderContainer}>
                { 
                    activeAuthScreen === 'EnterPhoneNumberScreen' ?
                        <EnterThePhoneNumberScreen 
                            setUserPhone={setUserPhone}
                            setActiveAuthScreen={setActiveAuthScreen}
                        />
                    : activeAuthScreen === 'EnterOtherDataScreen' ?
                        <EnterOtherDataScreen
                            setActiveAuthScreen={setActiveAuthScreen}
                            onSignUpBtnPress={handleSignUp}
                            onSignInBtnPress={handleSignIn}
                        />
                    : 
                    <View></View>
                }
            </View>
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
    sliderContainer: {
        flex: 1,
    },
    swiper: {
        flex: 1,
    },
    sliderItems: {
        flex: 1,
    },
})
