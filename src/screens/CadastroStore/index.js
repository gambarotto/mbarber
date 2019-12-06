import React, { useState, useEffect } from 'react';
import {
    View, 
    Text, 
    Image,
    KeyboardAvoidingView, 
    TouchableOpacity,
    TextInput, 
    Keyboard, 
    ScrollView, 
    Alert, 
    Switch, 
    ToastAndroid,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import { TextInputMask } from 'react-native-masked-text'

import ModalProgress from '../../components/ModalProgress'
import { styles } from './styles.js'
import { colors } from '../../metrics'

export default function CadastroStore({ navigation }) {

    const [pathImage, setPathImage] = useState('')
    const [idStore, setIdStore] = useState('')
    const [nome, setNome] = useState('')
    const [address, setAddress] = useState({
        rua: '',
        bairro: '',
        n: '',
        cidade: '',
        cep: ''
    })
    const [phone, setPhone] = useState({
        tel1: '',
        tel2: ''
    })
    const [email, setEmail] = useState('')
    const [uriImage, setUriImage] = useState('')
    const [alterado, setAlterado] = useState(false)
    const [nomeOk, setNomeOk] = useState(false)
    const [teclado, setTeclado] = useState(false)
    const [uploadData, setUploadData] = useState(null)
    const [ativa, setAtiva] = useState(null)
    const [urlImageUploaded, setUrlImageUploaded] = useState(null)
    const [nomeImage, setNomeImage] = useState('')
//    const [progress, setProgress] = useState(0)
    const [cnpj, setCnpj] = useState('')
    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        keybordDidShowListener = Keyboard.addListener(
            'keyboardDidShow', _keyboardDidShow,
        )
        keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', _keyboardDidHide,
        )

        firebase.database().ref('barberInfo/t8').once('value', (snapshot) => {
            console.log(snapshot.val());

        })
        //Return só é chamado quando o component é desmontado
        return () => {
            keybordDidShowListener.remove()
            keyboardDidHideListener.remove()
        }

    }, [])

    useEffect(() => {

        setNomeOk(true)

    }, [nomeImage])

    useEffect(() => {
        if (alterado) {

            uploadImage()
        }
    }, [idStore])

    useEffect(() => {
        if (alterado) {

            attDataFirebase()
            setVisibleModal(true)
        }

    }, [uploadData])

    function _keyboardDidShow() {
        //return alert('show')
        setTeclado(true)
    }

    function _keyboardDidHide() {
        //return alert('closed')
        setTeclado(false)
    }
    function deleteStore() {
        Alert.alert(
            'Cadastro Realizado!',
            'Barbearia Cadastrada com Sucesso!',

            { cancelable: false },
        )
    }
    /**---------------------------------------------------------------------------------------
     * MÉTODO RESPONSAVEL POR ESCOLHER A FOTO NO APARELHO
     ---------------------------------------------------------------------------------------*/
    const options = {
        title: `Nova Foto`,
        chooseFromLibraryButtonTitle: 'Escolher Foto da Galeria',
        takePhotoButtonTitle: 'Tirar uma Foto'
    }

    async function choosePhoto() {

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                //ToastAndroid('User cancelled image picker');
            } else if (response.error) {
                //ToastAndroid('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //ToastAndroid('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setPathImage(response.path)
                setUriImage(response.uri)

                const ext = response.uri.split('/').pop()
                const filename = `testeeedi.${ext}`
                setNomeImage(filename)

            }
        })
    }

    /**---------------------------------------------------------------------------------------
     * MÉTODO PARA FAZER UPLOAD DA IMAGEM PARA O FIREBASE
     ---------------------------------------------------------------------------------------*/

    function uploadImage() {
        //        const filename = `${nome}.${ext}`

        //console.log('entrou upload image idstore' + idStore + ' nome Imagem ' + nomeImage + 'uri '+ uriImage);

        try {
            firebase.storage()
                .ref(`barber/${idStore}/${nomeImage}`)
                .putFile(pathImage)
                .on(
                    firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

                        // const {bytesTransferred, totalBytes} = snapshot

                        // setProgress((bytesTransferred / totalBytes) *100)

                        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                            setUrlImageUploaded(snapshot.downloadURL)
                            setUploadData(snapshot.downloadURL)

                            // Alert.alert(
                            //     'Cadastro Realizado!',
                            //     'Barbearia Cadastrada com Sucesso!',
                            //     [{ 'text': 'OK', onPress: () => navigation.goBack() }],
                            //     { cancelable: false },
                            // )
                            //console.log('upload ok' + ' ' + urlImageUploaded)
                        }
                    }, (error) => {
                        console.error(error);

                    }
                )
        } catch (e) {
            console.error(e)
        }

    }

    function attDataFirebase() {
        const ref = firebase.database().ref('barberInfo')

        const save = {}
        save[idStore] = {
            id: idStore,
            imageUrl: urlImageUploaded,
            nome,
            address,
            email,
            phone,
            ativa,
            cnpj
        }

        // save[idStore] = {
        //     imageUrl: urlImageUploaded,
        //     nome: 'di',
        //     address: 'rua',
        //     email: 'e@e.com',
        //     phone: '9999999999',
        //     ativa: true
        // }

        ref.update(save).then(
            
        ).catch(e => {
            console.error(e)
        })
    }

    function saveOnFirebase() {
        if (pathImage && nome && address && email && phone) {

            setIdStore(firebase.database().ref('barberInfo').push().key)

            setAlterado(true)
        } else {
            ToastAndroid.show('Preencha todos os Campos', ToastAndroid.SHORT)
        }
    }

    function handleAddressObj(text, input) {
        const addressObj = { ...address }
        addressObj[input] = text
        setAddress(addressObj)
    }

    function handlePhoneObj(text, input) {
        const phoneObj = { ...phone }
        phoneObj[input] = text
        setPhone(phoneObj)
    }

    function visibleModalChange(bool){
        setVisibleModal(bool)
        navigation.navigate('ListStore')
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={-500}
            style={styles.container}>
            <TouchableOpacity
                style={styles.containerImage}
                onPress={choosePhoto}>
                <Image
                    source={uriImage ? { uri: uriImage } : require('../../../assets/1.jpg')}
                    style={styles.imageStore}
                    resizeMode='contain' />
                <Text style={styles.textImage}>Toque na Imagem para altera-la</Text>
            </TouchableOpacity>

            <ScrollView style={{ flex: 1, margin: 0 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder='Nome da Loja'
                        placeholderTextColor={colors.placeHolderDarker}
                        style={styles.input}
                        value={nome ? nome : ''}
                        onChangeText={(text) => setNome(text)}
                        returnKeyType='next'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onSubmitEditing={() => cnpjInput}
                        ref={(input) => this.nomeInput = input}
                    />

                    <TextInputMask
                        type={'cnpj'}
                        placeholder='CNPJ'
                        placeholderTextColor={colors.placeHolderDarker}
                        style={styles.input}
                        value={cnpj ? cnpj : ''}
                        onChangeText={(text) => setCnpj(text)}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => cnpjInput = input}
                    />

                    <TextInput
                        placeholder='Rua'
                        placeholderTextColor={colors.placeHolderDarker}
                        style={styles.input}
                        value={address.rua ? address.rua : ''}
                        onChangeText={(text) => handleAddressObj(text, 'rua')}
                        returnKeyType='next'
                        autoCapitalize='words'
                        autoCorrect={false}
                        ref={(input) => this.ruaInput = input}
                        
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder='Bairro'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={styles.input}
                            value={address.bairro ? address.bairro : ''}
                            onChangeText={(text) => handleAddressObj(text, 'bairro')}
                            returnKeyType='next'
                            autoCapitalize='words'
                            autoCorrect={false}
                            ref={(input) => this.bairroInput = input}
                        
                        />

                        <TextInput
                            placeholder='N°'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={[styles.input, { maxWidth: 80, marginLeft: 4 }]}
                            value={address.n ? address.n : ''}
                            onChangeText={(text) => handleAddressObj(text, 'n')}
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            ref={(input) => this.nInput = input}
                        
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder='Cidade'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={styles.input}
                            value={address.cidade ? address.cidade : ''}
                            onChangeText={(text) => handleAddressObj(text, 'cidade')}
                            returnKeyType='next'
                            autoCapitalize='words'
                            autoCorrect={false}
                            ref={(input) => this.cidadeInput = input}
                          
                        />

                        <TextInputMask
                            type={'zip-code'}
                            placeholder='CEP'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={[styles.input, { maxWidth: 100, marginLeft:5 }]}
                            value={address.cep ? address.cep : ''}
                            onChangeText={(text) => handleAddressObj(text, 'cep')}
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            ref={(input) => this.cepInput = input}
                          
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInputMask
                            type={'cel-phone'}
                            placeholder='Telefone 1'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={styles.input}
                            value={phone.tel1 ? phone.tel1 : ''}
                            onChangeText={(text) => handlePhoneObj(text, 'tel1')}
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='phone-pad'
                            ref={(input) => this.tel1Input = input}
                          
                        />
                        <TextInputMask
                            type={'cel-phone'}
                            placeholder='Telefone 2'
                            placeholderTextColor={colors.placeHolderDarker}
                            style={[styles.input, {marginLeft:5}]}
                            value={phone.tel2 ? phone.tel2 : ''}
                            onChangeText={(text) => handlePhoneObj(text, 'tel2')}
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='phone-pad'
                            ref={(input) => this.tel2Input = input}
                          
                        />
                    </View>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={colors.placeHolderDarker}
                        style={styles.input}
                        value={email ? email : ''}
                        onChangeText={(text) => setEmail(text)}
                        returnKeyType='go'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        ref={(input) => this.emailInput = input}
                    />
                </View>
            </ScrollView>

            {teclado ? null :
                <View style={styles.switch}>
                    <Text
                        style={[styles.txtSwitch, !ativa && { color: colors.tertiary }]}>
                        {ativa ? 'Loja Ativa' : 'Loja Desativada'}
                    </Text>
                    <Switch
                        value={ativa}
                        onChange={() => setAtiva(!ativa)}
                        trackColor={{ false: colors.tertiary, true: colors.primary }}
                    />
                </View>
            }
            {teclado ? null :
                <View style={styles.containerButtons}>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={null}>
                        <Icon name='trash' size={25} color={colors.loginBackground} />
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={styles.btnSalvar}
                        onPress={saveOnFirebase}>
                        <Text style={styles.txt}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            }
            <Modal
                visible={visibleModal}
                onRequestClose={() => visibleModalChange(false)}
                transparent={true}
                animationType={'fade'}>
                    <ModalProgress 
                        visibleModalChange={visibleModalChange} />
            </Modal>
        </KeyboardAvoidingView>
    );
}
CadastroStore.navigationOptions = {
    header: null
}