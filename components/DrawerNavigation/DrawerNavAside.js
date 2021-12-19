import React from 'react'
import { StyleSheet} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import WalletScreen from '../MainAppPartScreens/WalletScreen/CreateOrderScreen';
import CustomDrawer from './CustomDrawer';
// Drawer nav screens
import MapViewScreen from '../MainAppPartScreens/MapViewScreen/MapViewScreen';
import MyWalletScreen from '../MainAppPartScreens/WalletScreen/MyWalletScreen';
import CreateOrderScreen from '../MainAppPartScreens/WalletScreen/CreateOrderScreen';
import CreditCardsScreen from '../MainAppPartScreens/WalletScreen/CreditCardsScreen';

// navigation.navigate('Notifications')}, navigation.goBack()

const Drawer = createDrawerNavigator();

export default function DrawerNavAside() {
    return (
        <Drawer.Navigator 
            screenOptions={{ headerShown: false }}
            drawerContent={ props => <CustomDrawer {...props} /> }
        > 
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
            <Drawer.Screen 
                name="MyWalletScreen" 
                component={MyWalletScreen} 
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
                name="CreditCardsScreen" 
                component={CreditCardsScreen} 
                options={{ 
                    drawerLabel: 'Credit cards',   
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
                name="CreateOrderScreen" 
                component={CreateOrderScreen} 
                options={{ 
                    drawerLabel: 'Create order screen',
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
