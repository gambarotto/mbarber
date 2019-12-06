import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import './styles.js'
import { styles } from './styles.js';
import { colors } from '../../metrics/index.js';

export default function Login(props) {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    let unsubscriber = null

    useEffect(() => {
        unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            console.log('listener user login ' + user);
        })
        return () => {
            unsubscriber()
        }
    }, [])

    async function signIn() {
        console.log('login');

        await firebase.auth().signInWithEmailAndPassword(email, senha).then(data => {
            const userData = {
                uid: data.user.uid,
                email: data.user.email
            }
            try {
                AsyncStorage.setItem('user', JSON.stringify(userData))
                    .then(props.navigation.navigate('App'))

            } catch (e) {
                ToastAndroid.show('Falha ao Logar', ToastAndroid.SHORT)
            }
        }).catch(e => console.log(e))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.containerImg}>
                <Image style={styles.img} source={require('../../../assets/images/logo.png')} />
                <Text style={styles.logoText}>MASTER BARBER</Text>
            </View>
            <TextInput
                placeholder='Email'
                placeholderTextColor='#aaa'
                style={styles.inputs}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
                onSubmitEditing={() => this.passwordInput.focus()}
            />
            <TextInput
                placeholder='Senha'
                placeholderTextColor='#aaa'
                style={styles.inputs}
                secureTextEntry
                onChangeText={(text) => setSenha(text)}
                returnKeyType='go'
                ref={(input) => this.passwordInput = input}
            />

            <TouchableOpacity
                style={styles.containerButton}
                onPress={signIn}
            >
                <Text style={styles.textButton}>LOGIN</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>


    );
}
Login.navigationOptions = {
    header: null
}
