import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setRouteMarkersCoordinates, setIsSetCurrentLocationTitle } from '../../../store_redux/mapDataSlice'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

export default function SearchField() {
    const dispatch = useDispatch()
    const isSetCurrentLocationTitle = useSelector(state => state.mapData.isSetCurrentLocationTitle)
    const typeOfStep = useSelector(state => state.mapData.typeOfStep)
    
    const searchQueryFieldRef = useRef("null");

    /* Set placeholder-text in search location input when was chosen 'current location' as first marker */
    useEffect(() => {
        if (isSetCurrentLocationTitle == true)
            searchQueryFieldRef.current.setAddressText('Your current location...');
        else if (isSetCurrentLocationTitle == false || typeOfStep == 'To') {
            dispatch(setIsSetCurrentLocationTitle({isSetCurrentLocationTitle: false}))
            searchQueryFieldRef.current.setAddressText('');
        }
    }, [isSetCurrentLocationTitle, typeOfStep]);

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                ref={searchQueryFieldRef}
                placeholder={typeOfStep + '...'}
                fetchDetails={true}
                minLength={2}
                returnKeyType={"search"}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    let i = -1;
                    if (typeOfStep == 'From') {
                        i = 0
                    }
                    else if (typeOfStep == 'To') {
                        i = 1
                    }
                    dispatch(setRouteMarkersCoordinates(
                        {
                            index: i, 
                            title: details.address_components[1].long_name,
                            latlng: details.geometry.location
                        }
                    ))
                }}
                query={{
                    key: 'AIzaSyC6KJbk2J5pQPMJnjwzgWzENqDGJaPddW0',
                    language: 'ru',
                }}
                styles={{
                    textInputContainer: {
                        borderRadius: 10,
                    },
                    textInput: {
                        height: 50,
                        color: '#333333',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#111111',
                    },
                }}
                enablePoweredByContainer={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        zIndex: 5,
        overflow: 'scroll',
        top: 60
    }
})
