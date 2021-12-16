import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import WalletScreen from '../MainAppPartScreens/WalletScreen/WalletScreen';
import MapViewScreen from '../MainAppPartScreens/MapViewScreen/MapViewScreen';
import CustomDrawer from './CustomDrawer';

// navigation.navigate('Notifications')}, navigation.goBack()

const Drawer = createDrawerNavigator();

export default function DrawerNavAside() {
    return (
        <Drawer.Navigator 
            screenOptions={{ headerShown: false }}
            drawerContent={ props => <CustomDrawer {...props} /> }
        > 
            <Drawer.Screen 
                name="WalletScreen" 
                component={WalletScreen} 
                options={{ 
                    drawerLabel: 'Wallet',   
                    drawerLabelStyle: {
                        fontSize: 15,
                        fontFamily: 'murecho_regular',
                        color: '#525252'
                    },
                    drawerItemStyle: {
                        borderWidth: 1,
                        borderColor: '#fcba03'
                    },
                    drawerInactiveBackgroundColor:'#f7f7f7',
                    drawerActiveBackgroundColor: '#fcba03'
            }}/>
            <Drawer.Screen 
                name="MapViewScreen" 
                component={MapViewScreen} 
                options={{ 
                    drawerLabel: 'Create route',
                    drawerLabelStyle: {
                        fontSize: 15,
                        fontFamily: 'murecho_regular',
                        color: '#525252'
                    },
                    drawerItemStyle: {
                        borderWidth: 1,
                        borderColor: '#fcba03'
                    },
                    drawerInactiveBackgroundColor:'#f7f7f7',
                    drawerActiveBackgroundColor: '#fcba03'
            }}/>
           
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
})
