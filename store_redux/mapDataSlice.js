import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location';

export const GetCurrentLocation = createAsyncThunk(
  'mapData/GetCurrentLocation',
  async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return 'Permission to access location was denied';
    }
    let myLocation = await Location.getCurrentPositionAsync();
     // console.log(myLocation)
    return myLocation;
  }
)

const initialState = {
  /* Data from DB */
  carDrivers: null,
  cars: null,

  geometryLocation: null,
  descriptionLocation: null,

  /* Data for route creation */
  typeOfStep: 'From',
  routeMarkersCoordinates: [
    {
      markerType: 'From',
      title: '...',
      latlng: null,
      description: '...'
    },
    {
      markerType: 'To',
      title: '...',
      latlng: null,
      description: '...'
    }
  ],
  selectedCarData: {
    car_title: 'Car',
    cost: 'cost',
    photo_url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550876.png?token=exp=1639404512~hmac=b1f4bcd6cd956390697b8b5173822599'
  },
  selectedCarDriverData: {
    name: 'Driver',
    age: '(age)',
    photo_url: 'https://cdn-icons.flaticon.com/png/512/122/premium/122447.png?token=exp=1639404563~hmac=78800406b6bfabb5a31e76e66fbf9e39',
  },
  /* ------------------------ */
  currentLocation: null,
  isSetCurrentLocationTitle: false
}

export const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    /* Data from DB */
    setCarDrivers: (state, action) => {
      state.carDrivers = action.payload.cars_drivers 
    },
    setCars: (state, action) => {
      state.cars = action.payload.cars
    },
    setGeometryLocation: (state, action) => {
      state.geometryLocation = action.payload.geometryLocation
    },
    setDescriptionLocation: (state, action) => {
      state.descriptionLocation = action.payload.descriptionLocation
    },

    setTypeOfStep: (state, action) => {
      state.typeOfStep = action.payload.typeOfStep
    },
    setRouteMarkersCoordinates: (state, action) => {
      let index = action.payload.index;
      state.routeMarkersCoordinates[index].title = action.payload.title
      state.routeMarkersCoordinates[index].latlng = action.payload.latlng
    },
    /* Data for route creation */
    setEmptyValuesForRouteMarkersCoordinates: (state) => {
      state.routeMarkersCoordinates = [
        {
          markerType: 'From',
          title: '...',
          latlng: null,
          description: '...'
        },
        {
          markerType: 'To',
          title: '...',
          latlng: null,
          description: '...'
        }
      ]
    },
    setSelectedCarData: (state, action) => {
      state.selectedCarData = {
        car_title: action.payload.selectedCarData.car_title,
        cost: action.payload.selectedCarData.cost,
        photo_url: action.payload.selectedCarData.photo_url,
      }
    },
    setSelectedCarDriverData: (state, action) => {
      state.selectedCarDriverData = {
        name: action.payload.selectedCarDriverData.name,
        age: action.payload.selectedCarDriverData.age,
        photo_url: action.payload.selectedCarDriverData.photo_url
      }
    },
    /* ------------------------ */
    setIsSetCurrentLocationTitle: (state, action) => {
      state.isSetCurrentLocationTitle = action.payload.isSetCurrentLocationTitle
    }
  },

  extraReducers: {
    [GetCurrentLocation.fulfilled]: (state, action) => {
      state.currentLocation = action.payload.coords
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  setCarDrivers,
  setCars,
  setGeometryLocation, 
  setDescriptionLocation,

  setTypeOfStep,
  /* Data for route creation */
  setRouteMarkersCoordinates,
  setEmptyValuesForRouteMarkersCoordinates,
  setSelectedCarData,
  setSelectedCarDriverData,
  /* ------------------------ */
  setIsSetCurrentLocationTitle
} = mapDataSlice.actions

export default mapDataSlice.reducer