import React, { useState, useCallback, useEffect } from 'react'
import { setUserWalletData } from '../../../store_redux/otherAppDataSlice'
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { auth } from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function CreditCardsScreen({ navigation }) {
    const [newCardData, setNewCardData] = useState()

    const USER_CREDIT_CARDS_DATA = useSelector(state => state.otherAppData.userWalletData)

    const dispatch = useDispatch();
    // Get data from remote BD (Firebase)
    const getUserWalletData = useCallback(
        async () => { 
            const db = getDatabase();
            const db_ref = ref(db, 'users_data/wallets_data');
            const db_result = await get(db_ref)

            if (db_result.size != 0) {
                const userWalletData_ = Object.values(db_result.val());
                dispatch(setUserWalletData(userWalletData_))
            }
            else {
                dispatch(setUserWalletData(null))
            }
            
        }, [] 
    )

    const addNewCardData = async () => {
        if (newCardData) {
            const db = getDatabase();
            const db_ref = ref(db, 'users_data/wallets_data/' + newCardData.id);

            await set(db_ref, {
                id: newCardData.id,
                card_number: newCardData.number,
                card_balance: 1 + Date.now().toString().slice(0, 3),
                user_uid: auth.currentUser.uid
            })

            getUserWalletData()
        }
    }

    const deleteCard = async (id) => {
        const db = getDatabase();
        const db_ref = ref(db, 'users_data/wallets_data/' + id);

        await remove(db_ref)

        getUserWalletData()
    }

    useEffect(() => {
        getUserWalletData()
    }, [getUserWalletData])
    
    const creditCardItemWrapper = ({item}) => {
        if (item != null) {
            return (
                <View style={styles.creditCard_wrapper} key={item.id}>
                    <TouchableOpacity style={styles.subEl_4_button} onPress={() => setupSelectedPaymentMethod('card', item )}>
                        <AntDesign name="creditcard" size={24} color="#fcba03" />
                        <Text style={styles.subEl_4_btn_text}> {item.card_number} </Text>
                        <Text style={styles.subEl_4_btn_text}> {item.card_balance} $ </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteCard(item.id)}>
                        <MaterialCommunityIcons name="credit-card-minus" size={24} color="#fcba03" />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const _onChange = form => {
        setNewCardData({...form.values, id: Date.now().toString().slice(3)})
    }

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity style={styles.burgerMenu_btn} onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.sub_screen_container}>
                <View style={styles.screen_section_1}>
                    <CreditCardInput 
                        onChange={ (e) => _onChange(e) } 
                        cardScale={0.8}
                        cardImageFront={require("../../../assets/images/credit_card_bg.jpg")}
                        cardImageBack={require("../../../assets/images/credit_card_bg.jpg")}
                        labelStyle={{
                            color: '#525252',
                            fontFamily: 'murecho_regular',
                            fontSize: 14
                        }}
                        inputStyle={{
                            color: '#757575',
                            fontFamily: 'murecho_regular',
                            fontSize: 14
                        }}
                        inputContainerStyle={{ 
                            borderBottomWidth: 1, 
                            borderBottomColor: "#B7B7B7"
                        }}
                        placeholderColor={'#B7B7B7'}
                        labeld={{ number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" }}
                    />

                    <TouchableOpacity style={styles.addCard_button} onPress={ () => addNewCardData() }>
                        <Text style={styles.addCardBtn_text}> Add Card </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.screen_section_2}>
                    <Text style={styles.caption}> Your credit cards </Text>

                    { USER_CREDIT_CARDS_DATA ?
                        <FlatList
                            data={USER_CREDIT_CARDS_DATA}
                            renderItem={creditCardItemWrapper}
                            keyExtractor={item => item.id}
                        /> 
                        : <Text style={styles.attention}> You haven't added any cards yet.  </Text>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    /* Screen header */
    screenHeader: {
        paddingHorizontal: 20,
        width: '100%',
        position: 'absolute',
        top: 50, 
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    /* Menu button */
    burgerMenu_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    /* Screen section 1 */
    screen_section_1: {
        backgroundColor: '#f7f7f7',
        paddingTop: 130,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        paddingBottom: 30
    },
    sub_screen_container: {
    },
    /* Add card button */
    addCard_button: {
        borderRadius: 10,
        marginHorizontal: 20,
        paddingHorizontal: 35,
        paddingVertical: 15,
        marginTop: 35,
        backgroundColor: '#fcba03',
    },
    addCardBtn_text: {
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#fff8f2'
    },
    liteCreditCardInput: {
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginBottom: 10,
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1,
        fontFamily: 'murecho_regular',
        fontSize: 15,
    },
    /* Screen section 2 */
    screen_section_2: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    caption: {
        fontFamily: 'murecho_sBold',
        fontSize: 18,
        color: '#525252',
        marginBottom: 20
    },
    attention: {
        fontFamily: 'murecho_regular',
        fontSize: 18,
        color: '#fcba03',
        marginTop: 20,
        textAlign: 'center',
    },
    /* Credit card wrapper */
    creditCard_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subEl_4_button: {
        flex: 0.9,
        paddingHorizontal: 15, 
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fcba03',
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    subEl_4_btn_text: {
        fontFamily: 'murecho_regular',
        fontSize: 15,
        color: '#fcba03',
        marginLeft: 10
    },
})
