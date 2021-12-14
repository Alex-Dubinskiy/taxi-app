import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

export default function SignUpForm({onSignUpBtnPress}) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    return (
        <View style={styles.authForm}>
            <View style={styles.authForm_fields}>
                <TextInput 
                    style={styles.field} 
                    placeholder='Name...'
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName} />

                <TextInput 
                    style={styles.field} 
                    placeholder='Email...'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />

                <TextInput 
                    style={styles.field} 
                    placeholder='Password...'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </View>

            <TouchableOpacity 
                style={styles.authForm_btn} 
                onPress={()=> { onSignUpBtnPress(userName, email, password) }}>
                <Text style={styles.btnCaption}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    authForm: {
        backgroundColor: 'rgba(255,255,255, 0.8)',
        flex: 1,
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        alignItems: 'stretch',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        height: 300
    },
    authForm_fields: {

    },
    field: {
        paddingHorizontal: 20, 
        paddingVertical: 15, 
        backgroundColor: '#e3e3e3',
        fontSize: 15,
        fontFamily: 'murecho_regular',
        marginBottom: 10
    },
    authForm_btn:{
        marginTop: 10,
        paddingVertical: 15, 
        backgroundColor: '#fcba03',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnCaption:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
    }
})
