import AsyncStorage from '@react-native-async-storage/async-storage';

// Methods for using Async storage
const storeData = async (storage_key, value) => {  
    try {    
        await AsyncStorage.setItem(storage_key, JSON.stringify(value))  
    } catch (e) { }
}

const getData = async (storage_key) => {  
    try {    
        const value = await AsyncStorage.getItem(storage_key)  
        return value != null ? JSON.parse(value) : null;
    } catch(e) { }
} 

const removeValue = async (storage_key) => {  
    try {    
        await AsyncStorage.removeItem(storage_key)  
    } catch(e) { }
}

export default { storeData, getData, removeValue }
