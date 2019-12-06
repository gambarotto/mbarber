import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';

export default function SplashScreen({navigation}) {
    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('AuthLoading')
        },3000)

    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../../assets/images/logo.png')} />
            <Text style={styles.logoText}>MASTER BARBER</Text>
        </View>

    );
}
