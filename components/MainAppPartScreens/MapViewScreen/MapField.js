import React, { useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Dimensions } from 'react-native'
import MapView,{ Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

export default function MapField({isCanCreateRoute, setIsCanCreateRoute }) {
    const routeMarkersCoordinates = useSelector(state => state.mapData.routeMarkersCoordinates)
    const typeOfStep = useSelector(state => state.mapData.typeOfStep)

    const mapRef = useRef(null);
    useEffect(() => { 
        let rc = routeMarkersCoordinates.filter((rc, index) => {
            if (rc.markerType === typeOfStep) return rc
        })
        
        if (rc[0].latlng != null) { 
            mapRef.current.animateToRegion({ 
                latitude: rc[0].latlng.lat, 
                longitude: rc[0].latlng.lng, 
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421, 
            }) 
        } 
    }, [routeMarkersCoordinates]);

    if (!routeMarkersCoordinates) {
        return <ActivityIndicator size={'large'} color="yellow"/>
    }

    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            mapType='mutedStandard'
        >
            { 
                routeMarkersCoordinates.map((marker, index) => (
                   marker.latlng != null
                        ?
                        <Marker 
                            key={index}
                            title={marker.title}
                            coordinate={{ 
                                latitude: marker.latlng.lat,
                                longitude: marker.latlng.lng
                            }} 
                            description={marker.description}
                        />
                        : console.log()
                    )
                )
            }

            {/* Create route */}
            {
                isCanCreateRoute 
                ?
                <MapViewDirections
                    lineDashPattern={[0]}
                    origin={{
                        latitude: routeMarkersCoordinates[0].latlng.lat,
                        longitude: routeMarkersCoordinates[0].latlng.lng,
                    }}
                    destination={{
                        latitude: routeMarkersCoordinates[1].latlng.lat,
                        longitude: routeMarkersCoordinates[1].latlng.lng,
                    }}
                    apikey={'AIzaSyC6KJbk2J5pQPMJnjwzgWzENqDGJaPddW0'}
                    strokeWidth={5}
                    strokeColor="#fc0303"
                />
                : console.log() 
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
