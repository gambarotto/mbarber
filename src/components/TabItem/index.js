import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import { styles } from './styles';
import { colors } from '../../metrics'

const TabItem = props => (
    <TouchableOpacity 
        onPress={() => props.navigation.navigate(props.rota)}
        style={styles.containerItem}>
        <View style={styles.item}>
            <Icon name="image" size={24} color={colors.secondary}/>
            <Text style={styles.text}>{props.name}</Text>
        </View>
    </TouchableOpacity>
    )


export default TabItem;
