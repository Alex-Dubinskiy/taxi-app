import React, { useState, useEffect, useMemo} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { setIsClickedOpenAppBtn } from '../../store_redux/otherAppDataSlice'
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import AuthSlider from '../AuthorizationScreens/authSlider';
import MainAppPart from '../MainAppPartScreens/MainAppPart';
import SliderForFirstAppLoad from '../SliderForFirstAppLoad';
import functionsForAsyncStorage from '../../functionsForAsyncStorage';
import { auth } from '../../firebase';

export default function StartScreen({navigation}) {
    const [isAuth, setIsAuth] = useState(null)

    const { storeData, getData, removeValue } = functionsForAsyncStorage

    let isClickedOpenAppBtn = null;
    const dispatch = useDispatch()  
    const setIsClickedOpenAppBtn_status = (status) => { // if was clicked 'OpenAppBtn' in start app screen
        dispatch(setIsClickedOpenAppBtn({ // writing in Redux storage
            isClickedOpenAppBtn: status
        })) 
    }
    // If was clicked 'OpenAppBtn' in start app screen'
    isClickedOpenAppBtn = useSelector(state => state.otherAppData.isClickedOpenAppBtn)

    useEffect(()=> {
         // For old auth checking
        // Get data from Async storage
        // getData('user_data')
        // .then(res => {  // get user 'isAuth' status (true/false)
        //     if (res.email, res.password, res.isAuth)
        //        setIsAuth(res.isAuth)
        // })
        // .catch((error) => setIsAuth(false))
        onAuthStateChanged(auth, currentUser => {
            if (!currentUser) {
                setIsAuth(false)
            }
            else {
                setIsAuth(true)
            }
        })
    },[])
    
    return (
        <View style={styles.container}>
            { isAuth != null 
                ?
                    (isClickedOpenAppBtn != true && !isAuth)
                    ?
                    <SliderForFirstAppLoad setIsClickedOpenAppBtn_status={setIsClickedOpenAppBtn_status}/>
                    
                    : isClickedOpenAppBtn == true ?
                    <AuthSlider storeData={storeData} getData={getData}/>

                    : isAuth == true ?
                    <MainAppPart />

                    : <View></View>
                : 
                    <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
