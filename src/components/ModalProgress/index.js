import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'


import { colors } from '../../metrics'
import { styles } from './styles';

export default function ModalProgress(props) {

    const [butons, setButtons] = useState(false)
    //const [loading, setLoading] = useState(true)

    function changeVisibleModal(bool) {
        props.visibleModalChange(bool)
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View>
                    <Text style={styles.txtHeader}>
                        CADASTRO REALIZADO!
                    </Text>
                </View>
                <View>
                    <Icon name='check-circle' size={100} color={colors.inputColor}/>            
                </View>
                <View>
                    <TouchableOpacity
                        style={{height:70, justifyContent:'center', alignItems:'center'}}
                        onPress={() => changeVisibleModal(false)}>
                        <Text style={styles.txtBtnOk}>
                            OK
                </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
