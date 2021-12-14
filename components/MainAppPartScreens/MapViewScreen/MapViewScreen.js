import React, { useState, useEffect, useCallback } from 'react';
import { database } from '../../../firebase';
import { get, ref } from 'firebase/database';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCarDrivers, setCars } from '../../../store_redux/mapDataSlice';
import LaunchRouteForm from './LaunchRouteForm';
import MapField from './MapField';
import ClearRouteMarkersBtn from './ClearRouteMarkersBtn.js';
import SelectDriverAndCarForm from './SelectDriverAndCarForm';

export default function MapViewScreen() {
    const dispatch = useDispatch();
    const [isCanCreateRoute, setIsCanCreateRoute] = useState(false)
    const [nextStepStatus, setNextStepStatus] = useState(false)
    
    const carDrivers = useSelector(state => state.mapData.carDrivers)
    const cars = useSelector(state => state.mapData.cars)

    const routeMarkersCoordinates = useSelector(state => state.mapData.routeMarkersCoordinates)

    const createRouteLine = () => {
        // Проверка на то, можно ли рисовать маршрут (должны быть координаты для "от" и "до")
        if (routeMarkersCoordinates[0].latlng != null && routeMarkersCoordinates[1].latlng != null) setIsCanCreateRoute(true)
    }

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
            <MapField isCanCreateRoute={isCanCreateRoute} setIsCanCreateRoute={setIsCanCreateRoute} />
            
            <View style={styles.wrapperForms}>
                <LaunchRouteForm setIsCanCreateRoute={setIsCanCreateRoute} setNextStepStatus={setNextStepStatus} /> 
                <SelectDriverAndCarForm nextStepStatus={nextStepStatus} createRouteLine={createRouteLine}/> 
            </View>

            <ClearRouteMarkersBtn setIsCanCreateRoute={setIsCanCreateRoute} />
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
   },
   wrapperForms: {
       position: 'absolute',
       top: 20,
       width: '100%',
       alignItems: 'center',
   }
})
