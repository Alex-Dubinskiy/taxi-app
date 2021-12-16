import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { setUserWalletData } from '../../../store_redux/otherAppDataSlice'
import { Feather } from '@expo/vector-icons'; 
import { StyleSheet, TouchableOpacity, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth'

import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';

export default function WalletScreen({navigation}) {
    const [USER_WALLETS_DATA, set_USER_WALLETS_DATA] = useState([])
    
    const userWalletData = useSelector(state => state.otherAppData.userWalletData) 

    console.log(USER_WALLETS_DATA)
    const TRANSITS_DATA = [
        {
            id: 1,
            date: '17.12.21',
            time_departure: '15:00',
            time_arrival: '22:00',
            location_from: 'Kyiv',
            location_to: 'Lviv',
            cost_trip: '330'
        }
    ];

    // console.log(auth)
    // console.log(database)

    // onAuthStateChanged(auth, currentUser => {
       
    // })

    const dispatch = useDispatch();
    // Get data from remote BD (Firebase)
    const getUserWalletData = useCallback(
        async () => {
            if (!userWalletData) {
                const db = getDatabase();
                const db_ref = ref(db, 'users_data/wallets_data');
                const db_result = await get(db_ref)

                const userWalletData_ = db_result.val();
                dispatch(setUserWalletData({userWalletData: userWalletData_}))
            }
        }, [] 
    )

    useEffect(() => {
        getUserWalletData()
        set_USER_WALLETS_DATA([userWalletData])
    }, [getUserWalletData])

    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null) 
    /* Setuping selected payment method */

    const setupSelectedPaymentMethod = (pMethod, item) => {
        setSelectedPaymentMethod({
            paymentMethod: pMethod,
            paymentData: {
                id: item.id,
                card_number: item.card_number,
                card_balance: item.card_balance
            }
        })
        setShowPaymentMethodsList(false)
    }

    const historyItemWrapper = ({item}) => {
        return (
            <View style={styles.historyItemWrapper}>
                <Text style={styles.date_text}> {item.date} </Text>
                <Text style={styles.time_text}> {item.time_departure} - {item.time_arrival} </Text>
                <Text style={styles.from_to_locations_text}> {item.location_from} → {item.location_to} </Text>
                <Text style={styles.cost_text}> {item.cost_trip} $ </Text>
            </View>
        )
    }

    const paymentMethodItemWrapper = ({item}) => {
        return (
            <TouchableOpacity style={styles.subEl_4_button} onPress={() => setupSelectedPaymentMethod('card', item )}>
                <AntDesign name="creditcard" size={24} color="#fcba03" />
                <Text style={styles.subEl_4_btn_text}> {item.card_number} </Text>
                <Text style={styles.subEl_4_btn_text}> {item.card_balance} $ </Text>
            </TouchableOpacity>
        )
    }

    const [clientInfoForm, setClientInfoForm] = useState({
        first_and_last_names: '',
        phone: '',
        datetime: ''
    })
    
    const [showHistoryBlock, setShowHistoryBlock] = useState(false)
    const [showPaymentMethodsList, setShowPaymentMethodsList] = useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity style={styles.burgerMenu_btn} onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.showHistory_btn} onPress={() => setShowHistoryBlock(prev => !prev)} activeOpacity={0.7} >
                    <Text style={styles.showHistoryBtn_text}> { showHistoryBlock ? 'Hide' : 'History' } </Text>
                </TouchableOpacity>
            </View>

            { showHistoryBlock ? 
                <View style={styles.historyWrapper}>

                    <FlatList
                        data={TRANSITS_DATA}
                        renderItem={historyItemWrapper}
                        keyExtractor={item => item.id}
                    />

                    <Text style={styles.from_to_locations_text}>
                    </Text>
                </View>
            : console.log(selectedPaymentMethod)}
            
            <ScrollView style={styles.scrV_container}>
                <View style={styles.firstSection}>
                    <View style={styles.walletInfoWrapper}>
                        <View style={styles.subEl_1_myWallet}>
                            <Text style={styles.subEl_1_caption}>
                                My wallet
                            </Text>

                            <Text style={styles.subEl_1_text}>
                                { selectedPaymentMethod.paymentData.card_balance ? selectedPaymentMethod.paymentData.card_balance + ' $' : 'Your cash' }
                            </Text>
                        </View>

                        <View style={styles.subEl_2_amountSum}>
                            <Text style={styles.subEl_2_caption}>
                                Amount sent
                            </Text>

                            <Text style={styles.subEl_2_text}>
                                $ 50.70
                            </Text>
                        </View>
                    </View>

                    <View style={styles.paymentMethodWrapper}>
                        <Text style={styles.subEl_3_caption}>
                            Payment method
                        </Text>

                        { 
                            selectedPaymentMethod != null
                            ? 
                                selectedPaymentMethod.paymentMethod == "card" 
                                ?
                                    <TouchableOpacity style={[styles.subEl_3_button, { backgroundColor: showPaymentMethodsList ? '#DC9D00' : '#fcba03' }]} onPress={() => setShowPaymentMethodsList(prev => !prev)}>
                                        <AntDesign name="creditcard" size={24} color="#fff8f2" />
                                        <Text style={styles.subEl_3_btn_text}> Credit card </Text>
                                    </TouchableOpacity>
                                :
                                selectedPaymentMethod.paymentMethod == "cash" 
                                ?
                                    <TouchableOpacity style={[styles.subEl_3_button, { backgroundColor: showPaymentMethodsList ? '#DC9D00' : '#fcba03' }]} onPress={() => setShowPaymentMethodsList(prev => !prev)}>
                                        <Ionicons name="cash-outline" size={24} color="#fff8f2" />
                                        <Text style={styles.subEl_3_btn_text}> Cash </Text>
                                    </TouchableOpacity>
                                : 
                                    <View></View>
                            :  
                            <TouchableOpacity style={[styles.subEl_3_button, { backgroundColor: showPaymentMethodsList ? '#DC9D00' : '#fcba03' }]} onPress={() => setShowPaymentMethodsList(prev => !prev)}>
                                <MaterialCommunityIcons name="form-select" size={24} color="#fff8f2" />
                                <Text style={styles.subEl_3_btn_text}> Select </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                {/* Payment methods list */}

                { showPaymentMethodsList
                ?
                    <View style={styles.paymentMethodListWrapper}>
                        <FlatList
                            data={USER_WALLETS_DATA}
                            renderItem={paymentMethodItemWrapper}
                            keyExtractor={item => item.id}
                        />

                        <View style={styles.bts_wrapper}>
                            <TouchableOpacity style={[styles.subEl_4_button, styles.subEl_4_cash_button]} onPress={() => setupSelectedPaymentMethod('cash', {})}>
                                <Ionicons name="cash-outline" size={24} color="#8a8a8a" />
                                <Text style={[styles.subEl_3_btn_text, styles.subEl_3_addCart_text]}> Cash </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.subEl_4_button, styles.subEl_4_addCard_button]} onPress={() => setupSelectedPaymentMethod('card', {})}>
                                <Ionicons name="cash-outline" size={24} color="#fff8f2" />
                                <Text style={styles.subEl_3_btn_text}> Add card </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                : console.log()
                }

                <View style={styles.secondSection}>
                    <View style={styles.clientInfoWrapper}>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your first name and last name...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, first_and_last_names: text }}
                        )}/>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your phone...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, phone: text }}
                        )}/>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your datetime...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, datetime: text }}
                        )}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.apply_button}>
                    <Text style={styles.applyBtn_text}> Apply </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f7f7f7',
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
    showHistory_btn: {
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#f1f1f1',
    },
    showHistoryBtn_text: {
        fontFamily: 'murecho_regular',
        fontSize: 18,
        color: '#525252'
    },
    /* History */
    historyWrapper: {
        position: 'absolute',
        top: '5%', 
        left: '5%',
        zIndex: 5,
        width: '90%',
        height: '90%',
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        paddingVertical: 30,
        paddingHorizontal: 20,
        paddingTop: 100
    },
    historyItemWrapper: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 15, 
        paddingHorizontal: 20,
        borderRadius: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    date_text: {
        color: '#999999',
        fontFamily: 'murecho_regular',
        fontSize: 15,
        width: '45%',
        textAlign: 'left',
        marginBottom: 10,
    },
    time_text: {
        color: '#999999',
        fontFamily: 'murecho_regular',
        fontSize: 15,
        width: '45%',
        textAlign: 'right',
        marginBottom: 10,
    },
    from_to_locations_text: {
        color: '#999999', 
        fontFamily: 'murecho_regular',
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
    },
    cost_text: {
        color: '#999999',
        fontFamily: 'murecho_regular',
        fontSize: 15,
        textAlign: 'right',
        marginTop: 10,
    },
    /* Main screen part */
    scrV_container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15
    },
    /* First section */
    firstSection: {
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',
        height: 333
    },
    /* First sub section */
    walletInfoWrapper: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        position: 'absolute',
        top: 0, 
        left: 0,
        width: '100%',
        height: 260,
        backgroundColor: '#fff',
        paddingTop: 120,
        paddingHorizontal: 20,
        zIndex: 3
    },
    subEl_1_myWallet: {
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        paddingBottom: 5
    },
    subEl_1_caption: {
        fontFamily: 'murecho_sBold',
        fontSize: 20,
        color: '#525252',
        marginBottom: 11,
    },
    subEl_1_text: {
        fontFamily: 'murecho_sBold',
        fontSize: 30,
        color: '#525252'
    },
    subEl_2_amountSum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20, 
    },
    subEl_2_caption: {
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#999999'
    },
    subEl_2_text: {
        fontFamily: 'murecho_sBold',
        fontSize: 20,
        color: '#525252'
    },
    /* Second sub section */
    paymentMethodWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fcba03',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 35,
        paddingBottom: 13
    },
    subEl_3_caption: {
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#fff8f2'
    },
    subEl_3_button: {
        backgroundColor: '#FF8E0D',
        paddingHorizontal: 15, 
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff8f2',
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#525252',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subEl_3_btn_text: {
        fontFamily: 'murecho_regular',
        fontSize: 15,
        color: '#fff8f2',
        marginLeft: 10
    },
    /* Second section */
    secondSection: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    clientInfoWrapper: {
        paddingTop: 25
    },
    firAndLasNameInput: {
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginBottom: 10,
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1,
        fontFamily: 'murecho_regular',
        fontSize: 15,
    },
    phoneInput: {
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginBottom: 10,
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1,
        fontFamily: 'murecho_regular',
        fontSize: 15,
    },
    datetimeInput: {
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginBottom: 10,
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1,
        fontFamily: 'murecho_regular',
        fontSize: 15,
    },
    /* Apply button */
    apply_button: {
        borderRadius: 10,
        marginHorizontal: 20,
        paddingHorizontal: 35,
        paddingVertical: 15,
        marginTop: 35,
        backgroundColor: '#fcba03',
    },
    applyBtn_text: {
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#fff8f2'
    },
    /* Payment methods list wrapper  */
    paymentMethodListWrapper: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 15, 
        paddingHorizontal: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#fcba03',
        borderWidth: 1,
        borderTopWidth: 0,
        alignItems: 'stretch',
        width: '90%',
        position: 'absolute',
        right: '5%',
        left: '5%',
        top: 333,
        zIndex: 3,
    },
    subEl_4_button: {
        paddingHorizontal: 15, 
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fcba03',
        fontFamily: 'murecho_sBold',
        fontSize: 15,
        color: '#525252',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    /* Buttons wrapper */
    bts_wrapper: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginTop: 20
    }, 
    subEl_4_cash_button: {
        borderWidth: 1,
        borderColor: '#8a8a8a',
        backgroundColor: '#fff',
        marginBottom: 0,
    },
    subEl_4_addCard_button: {
        borderWidth: 0,
        backgroundColor: '#fcba03',
        marginBottom: 0,
    },
    subEl_3_addCart_text: {
        color: '#8a8a8a'
    },
    subEl_4_btn_text: {
        fontFamily: 'murecho_regular',
        fontSize: 15,
        color: '#fcba03',
        marginLeft: 10
    },
})
