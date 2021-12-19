import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { setUserWalletData, setCurrentOrderedTransitData } from '../../../store_redux/otherAppDataSlice'
import { Feather } from '@expo/vector-icons'; 
import { StyleSheet, TouchableOpacity, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';

export default function CreateOrderScreen({navigation}) {
    const [TRANSITS_HISTORY_DATA, set_TRANSITS_HISTORY_DATA] = useState()

    const USER_WALLETS_DATA = useSelector(state => state.otherAppData.userWalletData)

    const currentOrderedTransitData = useSelector(state => state.otherAppData.currentOrderedTransitData)
    // console.log(currentOrderedTransitData)
    
    const [showHistoryBlock, setShowHistoryBlock] = useState(false)
    const [showPaymentMethodsList, setShowPaymentMethodsList] = useState(false)

    const showTransitsHistoryBlock = () => {
        setShowHistoryBlock(prev => !prev);

        if (showHistoryBlock != true) { 
            getTransitsHistoryData();
        }
        
    }

    const openAddCreditCardScreen = () => {
        navigation.navigate('CreditCardsScreen')
    }

    const dispatch = useDispatch();
    // Get data from remote BD (Firebase)
    const getUserWalletData = useCallback(
        async () => { 
            const db = getDatabase();
            const db_ref = ref(db, 'users_data/wallets_data');
            const db_result = await get(db_ref)
            const userWalletData_ = Object.values(db_result.val());
            dispatch(setUserWalletData(userWalletData_))
        }, [] 
    )
    // Get data from remote BD (Firebase)
    const getTransitsHistoryData = useCallback(
        async () => { 
            const db = getDatabase();
            const db_ref = ref(db, 'users_data/transits_history');
            const db_result = await get(db_ref)

            if (db_result.size != 0) {
                const transitsHistoryData = Object.values(db_result.val());
               // console.log(transitsHistoryData)
                set_TRANSITS_HISTORY_DATA(transitsHistoryData)
            }
            else {
                set_TRANSITS_HISTORY_DATA(null)
            }
            
        }, [] 
    )

    // Add new data in BaseData
    const addCurrentOrderedTransitData = async () => {
        if (currentOrderedTransitData) {
            const db = getDatabase();
            const db_ref = ref(db, 'users_data/transits_history/' + currentOrderedTransitData.id);

            await set(db_ref, {
               id: currentOrderedTransitData.id,
               // roure data
               location_from: currentOrderedTransitData.from,
               location_to: currentOrderedTransitData.to,
               // car data
               car_title: currentOrderedTransitData.car_title,
               car_photo: currentOrderedTransitData.car_photo,
               cost_trip: currentOrderedTransitData.car_cost,
               // other data
               datetime: currentOrderedTransitData.datetime,
               // car driver data
               car_driver_photo: currentOrderedTransitData.car_driver_photo,
               car_driver_name: currentOrderedTransitData.car_driver_name,
               car_driver_age: currentOrderedTransitData.car_driver_age,
               // client data
               name_client: currentOrderedTransitData.client_first_and_last_names,
               phone_client: currentOrderedTransitData.client_phone,
               user_uid: auth.currentUser.uid
            })
        }
    }


    useEffect(() => {
        if (showPaymentMethodsList) {
            getUserWalletData()
        }
    }, [getUserWalletData, showPaymentMethodsList])
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null) 
    /* Setuping selected payment method */

    const setupSelectedPaymentMethod = (pMethod, item = null) => {
       // console.log(item)
        setSelectedPaymentMethod({
            paymentMethod: pMethod, 
            paymentData: item != null ? {
                id: item.id,
                card_number: item.card_number,
                card_balance: item.card_balance
            } : {}
        })
        console.log(selectedPaymentMethod.paymentData)
        setShowPaymentMethodsList(false)
    }

    const transitHistoryItemWrapper = ({item}) => {
        console.log(item)
        if (item != null) {
            return (
                <View style={styles.historyItemWrapper}>
                    <Text style={styles.transit_history_field}> {item.date} </Text>
                    <Text style={styles.transit_history_field}> {item.location_from} → {item.location_to}  </Text>
                    <Text style={styles.transit_history_field}> {item.cost_trip} $ </Text>
                    <Text style={styles.transit_history_field}> {item.datetime} </Text>
                    <Text style={styles.transit_history_field}> {item.car_title} → {item.location_to} </Text>
                    <Text style={styles.transit_history_field}> {item.name_client} $ </Text>
                    <Text style={styles.transit_history_field}> {item.phone_client} </Text>
                    <Text style={styles.transit_history_field}> {item.car_driver_name} </Text>
                    <Text style={styles.transit_history_field}> {item.car_driver_age} years </Text>
                </View>
            )
        }
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
    
    const writeNewTransitData = () => {
        dispatch(setCurrentOrderedTransitData(Object.assign({}, currentOrderedTransitData, clientInfoForm)))

        // Writes in BaseData
        addCurrentOrderedTransitData()
    }

    const [clientInfoForm, setClientInfoForm] = useState({
        client_first_and_last_names: '',
        client_phone: '',
        datetime: ''
    }) 
    
    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity style={styles.burgerMenu_btn} onPress={() => navigation.openDrawer()}>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.showHistory_btn} onPress={() => showTransitsHistoryBlock()} activeOpacity={0.7} >
                    <Text style={styles.showHistoryBtn_text}> { showHistoryBlock ? 'Hide' : 'History' } </Text>
                </TouchableOpacity>
            </View>

            { showHistoryBlock ? 
                <View style={styles.historyWrapper}>

                    <FlatList
                        data={TRANSITS_HISTORY_DATA}
                        renderItem={transitHistoryItemWrapper}
                        keyExtractor={item => item.id}
                    />

                    <Text style={styles.from_to_locations_text}>
                    </Text>
                </View>
            : <View></View> }
            
            <ScrollView style={styles.scrV_container}>
                <View style={styles.firstSection}>
                    <View style={styles.walletInfoWrapper}>
                        <View style={styles.subEl_1_myWallet}>
                            {
                                selectedPaymentMethod == null
                                ? 
                                    <Text style={styles.subEl_attention}>
                                        Select a Payment Method...
                                    </Text>
                                :
                                selectedPaymentMethod.paymentMethod === "cash"
                                ?
                                <Text style={styles.subEl_attention}>
                                    You have chosen to pay in cash...
                                </Text>
                                :
                                selectedPaymentMethod.paymentMethod === "card"
                                ?
                                <View>
                                    <Text style={styles.subEl_1_caption}>
                                        My wallet
                                    </Text>

                                    <Text style={styles.subEl_attention}>
                                        { selectedPaymentMethod.paymentData.card_balance + ' $' }
                                    </Text>
                                </View>
                                : <View></View> 
                            }
                
                        </View>

                        <View style={styles.subEl_2_amountSum}>
                            <Text style={styles.subEl_2_caption}>
                                Amount sent
                            </Text>

                            <Text style={styles.subEl_2_text}>
                                { currentOrderedTransitData.car_cost }
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
                                        <Text style={styles.subEl_3_btn_text}> { '****' + selectedPaymentMethod.paymentData.card_number.slice(-4) } </Text>
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
                        { USER_WALLETS_DATA != null
                            ?
                            <FlatList
                                data={USER_WALLETS_DATA}
                                renderItem={paymentMethodItemWrapper}
                                keyExtractor={item => item.id}
                            /> : <Text style={styles.attention}> You haven't added any cards yet.  </Text>
                        }

                        <View style={styles.bts_wrapper}>
                            <TouchableOpacity style={[styles.subEl_4_button, styles.subEl_4_cash_button]} onPress={() => setupSelectedPaymentMethod('cash', {})}>
                                <Ionicons name="cash-outline" size={24} color="#8a8a8a" />
                                <Text style={[styles.subEl_3_btn_text, styles.subEl_3_addCart_text]}> Cash </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.subEl_4_button, styles.subEl_4_addCard_button]} onPress={() => openAddCreditCardScreen()}>
                                <Ionicons name="cash-outline" size={24} color="#fff8f2" />
                                <Text style={styles.subEl_3_btn_text}> Add card </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                : <View></View> 
                }

                <View style={styles.secondSection}>
                    <View style={styles.clientInfoWrapper}>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your first name and last name...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, client_first_and_last_names: text }}
                        )}/>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your phone...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, client_phone: text }}
                        )}/>
                        <TextInput 
                            style={styles.firAndLasNameInput} 
                            placeholder='Your datetime...' 
                            onChangeText={(text) => setClientInfoForm(prev => {
                                return {...prev, datetime: text }}
                        )}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.apply_button} onPress={() => writeNewTransitData()}>
                    <Text style={styles.applyBtn_text}> Apply </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container_onload: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
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
    transit_history_field: {
        color: '#999999',
        fontFamily: 'murecho_regular',
        fontSize: 15,
        width: '45%',
        textAlign: 'left',
        marginBottom: 10,
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
    subEl_attention: {
        fontFamily: 'murecho_regular',
        fontSize: 20,
        color: '#525252',
        marginBottom: 11,
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
    attention: {
        fontFamily: 'murecho_regular',
        fontSize: 18,
        color: '#fcba03',
        marginVertical: 20,
        textAlign: 'center',
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
