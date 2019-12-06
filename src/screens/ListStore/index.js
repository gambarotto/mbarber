import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput
} from 'react-native';

import firebase from 'react-native-firebase'
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { styles } from './styles.js';
import { colors } from '../../metrics'
import AsyncStorage from '@react-native-community/async-storage';

const ItemList = ({ passLoadingTrue, name, phone, address, picture, email, props, id, ativa, cnpj }) => {

    function passLoadingTrueHere() {
        //passLoadingTrue()
        props.navigation.navigate('InfoScreen', {
            name,
            phone,
            address,
            email,
            picture,
            id,
            ativa,
            cnpj
        })
    }

    return (
        <TouchableOpacity
            style={styles.containerItem}
            onPress={passLoadingTrueHere}>
            <View style={styles.containerImage}>
                <Image style={styles.picture} source={{ uri: picture }} />
            </View>

            <View style={styles.containerInfos}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phone}>{phone.tel1}</Text>
                <Text style={styles.address}>
                    {`${address.rua}, ${address.n} - ${address.bairro}/ ${address.cidade}`}
                </Text>
            </View>
            <View style={[styles.isActive, 
                !ativa && {backgroundColor:'#a51b0b'}]}/>

        </TouchableOpacity>
    )
}

const ListStore = (props) => {

    const [dataB, setDataB] = useState([])
    const [search, setSearch] = useState('')
    const [filteredSearch, setFilteredSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //AsyncStorage.setItem('user','')
        const databaseListener = firebase.database().ref().child('barberInfo').on('value', function (snapshot) {
            const storesFb = []

            if (snapshot.val()) {
                snapshot.forEach(snap => {
                    //console.log(snap.val());
                    storesFb.push(snap.val())
                })

            } else {
                console.log('Sem Resultados')
            }

            setDataB([])
            setDataB(storesFb)
            setLoading(false)

        }, (erro) => console.log(erro))
        //getData()

        return () => {
            databaseListener()
        }

    }, [])

    function passLoadingTrue() {
        setLoading(true)
    }

    function getData() {

        firebase.database().ref().child('barberInfo').on('value', function (snapshot) {
            const storesFb = []

            if (snapshot.val()) {
                snapshot.forEach(snap => {
                    //console.log(snap.val());
                    storesFb.push(snap.val())
                })

            } else {
                console.log('Sem Resultados')
            }

            setDataB([])
            setDataB(storesFb)
            setLoading(false)

        }, (erro) => console.log(erro))
    }

    function searched(search) {

        setSearch(search)

        let filter = dataB.filter(item => {
            const itemData = `${item.nome.toUpperCase()}`
            const textSearched = search.toUpperCase()
            return itemData.indexOf(textSearched) > -1
        })

        setFilteredSearch(filter)
    }

    function logout() {

        props.navigation.navigate('AuthLoading')
        // firebase.auth().signOut()
        //     .then(
        //         //props.navigation.dispatch(navigateAction)
        //         props.navigation.navigate('AuthLoading')
        //         )

        //         // AsyncStorage.setItem('user', '')
        //         //     .then(
        //         //     props.navigation.navigate('AuthLoading'))
        //         //     .catch(errorAsync => console.log(errorAsync))
        //     .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerSearch}>
                <Icon name='search' size={20} color={colors.textPrimary} />
                <TextInput
                    placeholder='Barbearia'
                    placeholderTextColor={colors.textTertiary}
                    selectionColor={colors.tertiary}
                    style={styles.inputSearch}
                    value={search}
                    onChangeText={(text) => searched(text)}
                    returnKeyType='go'
                    returnKeyLabel='go'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={styles.iconLogout}
                    onPress={logout}
                    disabled={true}>
                    <Icon name='launch' size={20} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View> :
                <FlatList
                    style={{ marginTop: 8 }}
                    data={filteredSearch ? filteredSearch : dataB}
                    renderItem={({ item }) => <ItemList
                        id={item.id ? item.id : 'teste id'}
                        picture={item.imageUrl ? item.imageUrl : null}
                        name={item.nome ? item.nome : 'nome teste'}
                        phone={item.phone ? item.phone : {}}
                        address={item.address ? item.address : {}}
                        email={item.email ? item.email : 'rrrr@eeeee.com'}
                        ativa={item.ativa ? item.ativa : false}
                        cnpj={item.cnpj ? item.cnpj : '22244455577881'}
                        passLoadingTrue={passLoadingTrue}
                        props={props}
                    />}
                    keyExtractor={item => item.id}
                />
            }
            <TouchableOpacity
                style={styles.addStore}
                onPress={() => props.navigation.navigate('CadastroStore')}>
                <Text style={styles.addText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListStore
