import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity, TextInput } from 'react-native'
import SignInForm from './signInForm'
import SignUpForm from './signUpForm'

export default function EnterOtherDataScreen({onSignUpBtnPress, onSignInBtnPress}) {
    const [authMode, setAuthMode] = useState('signUp')
    
    return (
        <View style={styles.container}>
            <View style={[styles.authFormWrapper, {
                  height: authMode == 'signUp' ? 350 : 330,
            }]}>
                <View style={styles.authForm_header}>
                    <TouchableOpacity style={styles.authForm_headerBtns} onPress={()=> setAuthMode('signUp')}>
                        <Text style={[styles.headerBtns_text, {
                            color: authMode == 'signUp' ? '#37395F' : 'rgba(0,0,0,.5)',
                            fontFamily: authMode == 'signUp' ? 'murecho_sBold' : 'murecho_regular'
                        }]}> Sign Up </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.authForm_headerBtns} onPress={()=> setAuthMode('signIn')}>
                        <Text style={[styles.headerBtns_text, {
                            color: authMode == 'signIn' ? '#37395F' : 'rgba(0,0,0,.5)',
                            fontFamily: authMode == 'signIn' ? 'murecho_sBold' : 'murecho_regular'
                        }]}> Sign In </Text>
                    </TouchableOpacity>
                </View>
                { 
                    authMode === 'signUp' 
                    ? <SignUpForm 
                        onSignUpBtnPress={onSignUpBtnPress} /> 
                    : <SignInForm 
                        onSignInBtnPress={onSignInBtnPress} /> 
                }
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
    authFormWrapper: {
        width: '90%',
    },
    authForm_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    authForm_headerBtns: {
        backgroundColor: 'rgba(255,255,255, 0.8)',
        color: '#000',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20, 
        paddingVertical: 15, 
    },
    headerBtns_text: {
        color: '#37395F',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
    },
})
