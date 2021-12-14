import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { setSelectedCarData, setSelectedCarDriverData } from '../../../store_redux/mapDataSlice';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'

export default function SelectDriverAndCarForm({setIsCanCreateRoute, nextStepStatus, createRouteLine, isShowFormsForCreationRoute, setIsShowFormsForCreationRoute, setShowRouteInfoBtn, setIsTripRouteBuilt}) {
    const dispatch = useDispatch()
    const [isBlockCollapsed, setIsBlockCollapsed] = useState(false)

    const [isCarDriverBtnClicked, setIsCarDriverBtnClicked] = useState(false)
    const [isCarBtnClicked, setIsCarBtnClicked] = useState(false)

    /* Data from BD */
    const car_drivers = useSelector(state => state.mapData.carDrivers)
    const cars = useSelector(state => state.mapData.cars)

    /* Local data */
    const selectedCarData = useSelector(state => state.mapData.selectedCarData)
    const selectedCarDriverData = useSelector(state => state.mapData.selectedCarDriverData)

    const carListItemClick = (data) => {
        dispatch(setSelectedCarData(data))
        setIsCarBtnClicked(false)
    }

    const carDriverListItemClick = (data) => {
        dispatch(setSelectedCarDriverData(data))
        setIsCarDriverBtnClicked(false)
    }

    useEffect(() => {
        if (nextStepStatus) 
            setIsBlockCollapsed(true)
        else 
            setIsBlockCollapsed(false)
    }, [nextStepStatus])
    
    const carInfoListItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.selectDriverAndCarBtn, styles.carDriverInfoListItemWrapper]} onPress={() => carListItemClick({ selectedCarData: {car_title: item.title, cost: item.cost, photo_url: item.photo_url }})} activeOpacity={0.8}>
                <Image
                    style={styles.icon_img} 
                    source={{uri: item.photo_url}}
                />
                <Text style={styles.selectDriverAndCarBtn_caption}>
                    {item.title}
                </Text>

                <Text style={[styles.selectDriverAndCarBtn_caption, {position: 'absolute', right: 15}]}>
                    {item.cost} / km
                </Text>
            </TouchableOpacity>
        )
    }

    const carDriverInfoListItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.selectDriverAndCarBtn, styles.carInfoListItemWrapper]} onPress={() => carDriverListItemClick({ selectedCarDriverData: {name: item.name, age: item.age, photo_url: item.photo_url} })} activeOpacity={0.8}>
                <Image
                    style={styles.icon_img} 
                    source={{uri: item.photo_url}}
                />
                <Text style={styles.selectDriverAndCarBtn_caption}>
                    {item.name}
                </Text>

                <Text style={[styles.selectDriverAndCarBtn_caption, {position: 'absolute', right: 15}]}>
                    {item.age}
                </Text>
            </TouchableOpacity>
        )
    }
    
    const applyBtnClick = () => {
        if (nextStepStatus) {
            setIsBlockCollapsed(false)
            createRouteLine()
            setIsShowFormsForCreationRoute(false)
            setShowRouteInfoBtn(true)
            setIsTripRouteBuilt(true)
        }
    }

    if (!car_drivers && !cars) return (<Text>Loading...</Text>)

    if (isShowFormsForCreationRoute)
        return (
            <View style={[styles.container, {height: isBlockCollapsed ? 290 : 65}]}>
                <View style={styles.header}>
                    <Text style={styles.caption}>
                        Select preffer driver and car.
                    </Text> 

                    <TouchableOpacity style={styles.collapseBtnWrapper} onPress={() => setIsBlockCollapsed(prev => !prev) }>
                        {   isBlockCollapsed 
                            ? 
                            <AntDesign name="upcircleo" size={20} color="#fcba03" />
                            :
                            <AntDesign name="downcircleo" size={20} color="#fcba03" />
                        }
                    </TouchableOpacity>
                </View>

                { isBlockCollapsed
                    ?
                    <View style={styles.selectCarBtnWrapper}>
                        <TouchableOpacity style={styles.selectDriverAndCarBtn} onPress={() => setIsCarBtnClicked(prev => !prev)}>
                            <Image
                                style={styles.icon_img} 
                                source={{uri: selectedCarData.photo_url}}
                            />
                            <Text style={styles.selectDriverAndCarBtn_caption}>
                                {selectedCarData.car_title}
                            </Text>
                            
                            <Text style={[styles.selectDriverAndCarBtn_caption, {position: 'absolute', right: 15}]}>
                                {selectedCarData.cost} ($)
                            </Text>
                        </TouchableOpacity>

                        { isCarBtnClicked && true
                            ?
                            <View style={[styles.flatList_wrapper, {zIndex: 5}]}>
                                <FlatList
                                    data={cars}
                                    renderItem={carInfoListItem}
                                    keyExtractor={item => item.id}
                                />
                                </View>
                            : console.log()
                        } 
                    
                    </View>
                    : console.log()
                }

                { isBlockCollapsed
                    ?
                    <View style={styles.selectCarDriverBtnWrapper}>
                        <TouchableOpacity style={styles.selectDriverAndCarBtn} onPress={() => setIsCarDriverBtnClicked(prev => !prev)}>
                            <Image
                                style={styles.icon_img} 
                                source={{uri: selectedCarDriverData.photo_url}}
                            />
                            <Text style={styles.selectDriverAndCarBtn_caption}>
                                {selectedCarDriverData.name}
                            </Text>
                            <Text style={[styles.selectDriverAndCarBtn_caption, {position: 'absolute', right: 15}]}>
                                {selectedCarDriverData.age}
                            </Text>
                        </TouchableOpacity>

                        { isCarDriverBtnClicked
                            ?
                            <View style={[styles.flatList_wrapper, {zIndex: 3}]}>
                                <FlatList
                                    data={car_drivers}
                                    renderItem={carDriverInfoListItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            : console.log()
                        } 
                    </View>
                    : console.log()
                }

                { isBlockCollapsed 
                    ?
                    <TouchableOpacity style={styles.applyBtn} onPress={() => applyBtnClick()}>
                        <Text style={styles.applyBtn_caption}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                    : console.log()
                }
            </View>
        )
    else
        return (<View></View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255, 0.6)',
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        width: '90%',
        marginTop: 20
    },
    /* Header */
    header: {
        flexDirection: 'row',
        paddingHorizontal: 12, 
    },
    caption: {
        width: '100%',
        color: '#575757',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'murecho_regular',
    },
    collapseBtnWrapper: {

    },
    /* Buttons wrappers */
    selectCarBtnWrapper: {
        width: '100%',
        position: 'relative'
    },
    selectCarDriverBtnWrapper: {
        width: '100%',
        position: 'relative'
    },
    /* Styles for buttons */
    selectDriverAndCarBtn:{
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        borderColor: '#fcba03',
        backgroundColor: 'rgba(252, 186, 3, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        zIndex: 2,
        marginTop: 25
    },
    selectDriverAndCarBtn_caption:{
        color: '#e3a700',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_regular',
        marginLeft: 15
    },
    icon_img: {
        width: 30,
        height: 30,
        borderRadius: 10
    },
    /* List elements */
    carInfoListItemWrapper: {
        borderColor: '#fcba03',
        width: '100%',
        borderWidth: 0,
        borderBottomWidth: 2,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 0
    },
    carDriverInfoListItemWrapper: {
        borderColor: '#fcba03',
        width: '100%',
        borderWidth: 0,
        borderBottomWidth: 2,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 0
    },
    flatList_wrapper: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        top: 80,           
        width: '100%',
        position: 'absolute',
        zIndex: 10

    },
    applyBtn:{
        paddingVertical: 15, 
        backgroundColor: '#fcba03',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        zIndex: 2,
        marginTop:20
    },
    applyBtn_caption:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'murecho_sBold',
    }
})
