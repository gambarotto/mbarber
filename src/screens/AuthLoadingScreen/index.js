import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { styles } from './styles';
import {colors} from '../../metrics'

// import { Container } from './styles';

export default function AuthLoadingScreen({ navigation }) {

    useEffect(() => {
        console.log('authLoading in');
        
        let isMounted = true
        
        async function getUser() {
            
            await AsyncStorage.getItem('user')
            .then(res => {
                console.log(res)

                isMounted ? res !== null ? 
                        navigation.navigate('App') : navigation.navigate('Login')
                : null})
            .catch(err => console.log('authScreen error -> '+ err))
        }

        getUser() 
        
        return () => {
            isMounted = false

        }
    }, [])
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.primary}/>
        </View>
    )
}
