import React, { useState } from 'react'
import { Button, StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setPhone } from '../../store_redux/authDataSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EnterThePhoneNumberScreen({setUserPhone, setActiveAuthScreen}) {
    const [userPhone_, setUserPhone_] = useState('')
    
    return ( 
        <View style={styles.container}>
            <View style={styles.phoneNumberForm}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.captionText}>
                        Hello!
                    </Text>

                    <Text style={styles.subCaptionText}>
                        Get moving with taxi
                    </Text>
                </View>

                <TextInput 
                    value={userPhone_}
                    onChange={(e) => setUserPhone_(e.target.value)}
                    style={styles.phoneTextInput}
                    placeholder={'Your phone...'}
                />
                
                <TouchableOpacity 
                    style={styles.nextAuthStepBtnWrapper} 
                    onPress={() => {
                        setUserPhone(userPhone_)
                        setActiveAuthScreen('EnterOtherDataScreen')
                    }}
                >
                    <Text style={styles.nextAuthStepBtnText} >
                        Next   →
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    phoneNumberForm: {
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        width: '90%', 
        height: 250,
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        alignItems: 'stretch'
    },
    headerWrapper: {
    },
    captionText: {
        color: '#37395F',
        fontSize: 17,
        textAlign: 'left',
        fontFamily: 'murecho_medium',
        marginBottom: 10
    },
    subCaptionText: {
        color: '#37395F',
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'murecho_sBold',
    },
    phoneTextInput: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 20, 
        paddingVertical: 15,
        marginVertical: 20 
    },
    nextAuthStepBtnWrapper: {
        borderRadius: 20,
        backgroundColor: 'rgba(67, 71, 98, 0.5)',
        paddingVertical: 11,
        paddingHorizontal: 20,
    },
    nextAuthStepBtnText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'murecho_regular',
    }
  });
  