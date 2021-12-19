import React, { useState, useEffect, useCallback } from 'react';
import { database } from '../../../firebase';
import { get, ref } from 'firebase/database';
import { Feather } from '@expo/vector-icons'; 
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCarDrivers, setCars } from '../../../store_redux/mapDataSlice';
import LaunchRouteForm from './LaunchRouteForm';
import MapField from './MapField';
import ClearRouteMarkersBtn from './ClearRouteMarkersBtn.js';
import SelectDriverAndCarForm from './SelectDriverAndCarForm';
import ShowRouteInfoBtn from './ShowRouteInfoBtn';
import RouteInfoBlock from './RouteInfoBlock';

export default function MapViewScreen({navigation}) {
    const dispatch = useDispatch();

    /* Storing the status that taxi route is built */
    const [isTripRouteBuilt, setIsTripRouteBuilt] = useState(false)

    /* Show forms for route creation */
    const [isShowFormsForCreationRoute, setIsShowFormsForCreationRoute] = useState(true)
    const [showRouteInfoBtn, setShowRouteInfoBtn] = useState(false)

    const [isCanCreateRoute, setIsCanCreateRoute] = useState(false)
    /* For enable visible second form (event: creation route) */
    const [nextStepStatus, setNextStepStatus] = useState(false)
    
    // Local (in redux storage) data for 'SelectDriverAndCarForm'
    const carDrivers = useSelector(state => state.mapData.carDrivers)
    const cars = useSelector(state => state.mapData.cars)

    /* Get values ... */
    const routeMarkersCoordinates = useSelector(state => state.mapData.routeMarkersCoordinates)

    /* After some event action ... */
    const createRouteLine = () => {
        // Проверка на то, можно ли рисовать маршрут (должны быть координаты для "от" и "до")
        if (routeMarkersCoordinates[0].latlng != null && routeMarkersCoordinates[1].latlng != null) 
            setIsCanCreateRoute(true)
    }

    // Get data for 'SelectDriverAndCarForm' from remote BD (Firebase)
    const getData = useCallback(
        async () => {
          if (!carDrivers && !cars) {
            const db_ref = ref(database)
            const db = await get(db_ref)

            const cars_drivers_ = db.val().cars_drivers.slice(1)
            const cars_ = db.val().cars.slice(1)
            dispatch(setCarDrivers({cars_drivers: cars_drivers_}))
            dispatch(setCars({cars: cars_}))
          }
    }, [])

    useEffect(() => {
        getData();
    }, [getData])
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.burgerMenu_btn} onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>

            <MapField isCanCreateRoute={isCanCreateRoute} setIsCanCreateRoute={setIsCanCreateRoute} />
            
            <View style={styles.wrapperForms}>
                <LaunchRouteForm setIsCanCreateRoute={setIsCanCreateRoute} nextStepStatus={nextStepStatus} setNextStepStatus={setNextStepStatus} isShowFormsForCreationRoute={isShowFormsForCreationRoute}/> 
                <SelectDriverAndCarForm nextStepStatus={nextStepStatus} createRouteLine={createRouteLine} isShowFormsForCreationRoute={isShowFormsForCreationRoute} setIsShowFormsForCreationRoute={setIsShowFormsForCreationRoute} setShowRouteInfoBtn={setShowRouteInfoBtn} setIsTripRouteBuilt={setIsTripRouteBuilt}/> 
            </View>

            <ShowRouteInfoBtn showRouteInfoBtn={showRouteInfoBtn} setShowRouteInfoBtn={setShowRouteInfoBtn} isTripRouteBuilt={isTripRouteBuilt}/>
            <ClearRouteMarkersBtn setIsCanCreateRoute={setIsCanCreateRoute} setNextStepStatus={setNextStepStatus} setIsShowFormsForCreationRoute={setIsShowFormsForCreationRoute} setShowRouteInfoBtn={setShowRouteInfoBtn} setIsTripRouteBuilt={setIsTripRouteBuilt}/>
            <RouteInfoBlock showRouteInfoBtn={showRouteInfoBtn} navigation={navigation} />
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
   wrapperForms: {
        position: 'absolute',
        top: 120,
        width: '100%',
        alignItems: 'center',
   },
   burgerMenu_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 50,
        position: 'absolute',
        left: 20,
        top: 40,
        zIndex: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9
   }
})
