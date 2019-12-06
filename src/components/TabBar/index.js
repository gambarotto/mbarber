import React from 'react';

import { View , Text} from 'react-native';

import {styles} from './styles';
import TabItem from '../TabItem'

const TabBar = props => (
    <View style={styles.container}>
        <TabItem name='Imagem' rota='InfoScreen' props={props}/>
        <TabItem name='Info' rota='EditStore' props={props}/>

    </View>
    )

    
export default TabBar;
