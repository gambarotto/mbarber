import React, { useEffect, useState } from 'react';
import {
  View, Text, Image,
  KeyboardAvoidingView, TouchableOpacity,
  TextInput, Keyboard, ScrollView, Alert, Switch, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import { TextInputMask } from 'react-native-masked-text'

import { styles } from './styles.js'
import { colors } from '../../metrics'

export default function InfoScreen({ navigation }) {

  const [first, setFirst] = useState(true)

  const [idStore, setIdStore] = useState('')
  const [nome, setNome] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [uriImage, setUriImage] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [ativa, setAtiva] = useState(null)

  const [alterado, setAlterado] = useState(false)
  const [upImage, setUpImage] = useState(false)
  const [teclado, setTeclado] = useState(false)
  const [uploadData, setUploadData] = useState(null)
  const [urlImageUploaded, setUrlImageUploaded] = useState(null)
  const [pathImage, setPathImage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    keybordDidShowListener = Keyboard.addListener(
      'keyboardDidShow', _keyboardDidShow,
    )
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', _keyboardDidHide,
    )
    // setIdStore('67yhgu990uu')
    // setNome('Fulano')
    // setAddress({
    //   bairro: 'bairro1',
    //   cep: '12345-987',
    //   cidade: 'jundiai',
    //   n: '34526',
    //   rua: 'rua tal do tal'
    // })
    // setPhone({
    //   tel1: '',
    //   tel2: ''
    // })
    // setEmail('ghjhjjkk@hhgg')
    // setUriImage('"https://firebasestorage.googleapis.com/v0/b/barberapp-38b81.appspot.com/o/barber%2F-LunySNk2FOhfhUHWeYk%2Ftesteeedi.601490743?alt=media&token=f9762944-6045-4927-a6f5-0a05aa2fca44"')
    // setCnpj('55555555555555')
    // setAtiva(false)

    setIdStore(navigation.getParam('id'))
    setNome(navigation.getParam('name'))
    setAddress(navigation.getParam('address'))
    setPhone(navigation.getParam('phone'))
    setEmail(navigation.getParam('email'))
    setUriImage(navigation.getParam('picture'))
    setAtiva(navigation.getParam('ativa'))
    setCnpj(navigation.getParam('cnpj'))

    setLoading(false)
    //Return só é chamado quando o component é desmontado
    return () => {
      keybordDidShowListener.remove()
      keyboardDidHideListener.remove()
    }

  }, [])

  useEffect(() => {
    try {
      attDataFirebase(urlImageUploaded)
    } catch (e) {
      console.log(e);
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
      'Apagar Barbearia',
      'Você realmente deseja deletar essa Loja?',
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Sim', onPress: () => {
            const ref = firebase.database().ref('barberInfo').child(idStore)
            ref.remove(() => {
              Alert.alert(
                'BarberApp',
                'Loja Excluida com Sucesso!',
                [{ text: "OK", onPress: () => navigation.goBack() }]
              )
            })
          }
        }
      ],
      { cancelable: false },
    )
  }

  function saveStoreAlert() {
    Alert.alert(
      'Atualização',
      'Loja Atualizada com Sucesso!',
      [{ text: "OK", onPress: () => navigation.navigate('ListStore') }],
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

  function choosePhoto() {

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
        setUpImage(true)
        setPathImage(response.path)
        setUriImage(response.uri)
        //setAlterado(true)
      }
    })
  }

  /**---------------------------------------------------------------------------------------
   * MÉTODO PARA FAZER UPLOAD DA IMAGEM PARA O FIREBASE
   ---------------------------------------------------------------------------------------*/

  function uploadImage() {
    //alert(JSON.stringify(app))

    const ext = uriImage.split('/').pop()
    const filename = `${nome}.${ext}`

    try {
      firebase.storage()
        .ref(`barber/${idStore}/${filename}`)
        .putFile(pathImage)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

            // const {bytesTransferred, totalBytes} = snapshot
            //setStatus('Enviando')
            //setProgressUp((snapshot.bytesTransferred / snapshot.totalBytes) *100)

            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              setUrlImageUploaded(snapshot.downloadURL)
              setUploadData(snapshot.downloadURL)
            }
          }
        )
    } catch (e) {
      console.log(e);
    }
  }

  function attDataFirebase(url) {

    if (alterado) {
      const ref = firebase.database().ref('barberInfo')
      const save = {}
      save[idStore] = {
        id: idStore,
        imageUrl: url,
        nome,
        address,
        email,
        phone,
        ativa,
        cnpj
      }

      ref.update(save)

      saveStoreAlert()
    }
  }

  function saveOnFirebase() {
    if (upImage) uploadImage()
    attDataFirebase(uriImage)
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

  function editar() {
    setAlterado(true)
  }
  return (
    <>
      {loading ?
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.loginBackground
        }}>
          <ActivityIndicator size='large' />
        </View> :
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={-500}
          style={styles.container}>
          <TouchableOpacity
            style={styles.containerImage}
            onPress={choosePhoto}
            disabled={!alterado ? true : false}>
            <Image
              source={uriImage ? { uri: uriImage } : require('../../../assets/1.jpg')}
              style={styles.imageStore}
              resizeMode='contain' />
            <Text style={styles.textImage}>Toque na Imagem para altera-la</Text>
          </TouchableOpacity>

          <ScrollView style={{ flex: 1, margin: 0 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                editable={alterado ? true : false}
                placeholder='Nome da Loja'
                placeholderTextColor={colors.placeHolderDarker}
                style={styles.input}
                value={nome ? nome : ''}
                onChangeText={(text) => setNome(text)}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onSubmitEditing={() => this.addressInput.focus()}
                ref={(input) => this.nomeInput = input}
              />

              <TextInputMask
                editable={alterado ? true : false}
                type={'cnpj'}
                placeholder='CNPJ'
                placeholderTextColor={colors.placeHolderDarker}
                style={styles.input}
                value={cnpj ? cnpj : ''}
                onChangeText={(text) => setCnpj(text)}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onSubmitEditing={() => this.addressInput.focus()}
                ref={(input) => this.nomeInput = input}
              />

              <TextInput
                editable={alterado ? true : false}
                placeholder='Rua'
                placeholderTextColor={colors.placeHolderDarker}
                style={styles.input}
                value={address.rua ? address.rua : ''}
                onChangeText={(text) => handleAddressObj(text, 'rua')}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                ref={(input) => this.ruaInput = input}
                onSubmitEditing={() => this.bairroInput.focus()}
              />
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  editable={alterado ? true : false}
                  placeholder='Bairro'
                  placeholderTextColor={colors.placeHolderDarker}
                  style={styles.input}
                  value={address.bairro ? address.bairro : ''}
                  onChangeText={(text) => handleAddressObj(text, 'bairro')}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref={(input) => this.bairroInput = input}
                  onSubmitEditing={() => this.nInput.focus()}
                />

                <TextInput

                  editable={alterado ? true : false}
                  placeholder='N°'
                  placeholderTextColor={colors.placeHolderDarker}
                  style={[styles.input, { maxWidth: 80, marginLeft: 4 }]}
                  value={address.n ? address.n : ''}
                  onChangeText={(text) => handleAddressObj(text, 'n')}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref={(input) => this.nInput = input}
                  onSubmitEditing={() => this.cidadeInput.focus()}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  editable={alterado ? true : false}
                  placeholder='Cidade'
                  placeholderTextColor={colors.placeHolderDarker}
                  style={styles.input}
                  value={address.cidade ? address.cidade : ''}
                  onChangeText={(text) => handleAddressObj(text, 'cidade')}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref={(input) => this.cidadeInput = input}
                  onSubmitEditing={() => this.cepInput.focus()}
                />

                <TextInputMask
                  editable={alterado ? true : false}
                  type={'zip-code'}
                  placeholder='CEP'
                  placeholderTextColor={colors.placeHolderDarker}
                  style={[styles.input, { maxWidth: 100, marginLeft: 5 }]}
                  value={address.cep ? address.cep : ''}
                  onChangeText={(text) => handleAddressObj(text, 'cep')}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref={(input) => this.cepInput = input}
                  onSubmitEditing={() => this.tel1Input.focus()}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInputMask
                  editable={alterado ? true : false}
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
                  onSubmitEditing={() => this.tel2Input.focus()}
                />
                <TextInputMask
                  editable={alterado ? true : false}
                  type={'cel-phone'}
                  placeholder='Telefone 2'
                  placeholderTextColor={colors.placeHolderDarker}
                  style={[styles.input, { marginLeft: 5 }]}
                  value={phone.tel2 ? phone.tel2 : ''}
                  onChangeText={(text) => handlePhoneObj(text, 'tel2')}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='phone-pad'
                  ref={(input) => this.tel2Input = input}
                  onSubmitEditing={() => this.emailInput.focus()}
                />
              </View>
              <TextInput
                editable={alterado ? true : false}
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
                disabled={!alterado ? true : false}
                onChange={() => setAtiva(!ativa)}
                trackColor={{ false: colors.tertiary, true: colors.tertiary }}
              />
            </View>
          }
          {teclado ? null :
            alterado ?
              <View style={styles.containerButtons}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={deleteStore}>
                  <Icon name='trash' size={25} color={colors.tertiary} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={alterado ? 0.2 : 1}
                  style={styles.btnSalvar}
                  onPress={saveOnFirebase}>
                  <Text style={alterado ? styles.txt : styles.txtNo}>Salvar</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.containerButtons}>
                <TouchableOpacity
                  style={styles.btnAlterar}
                  onPress={editar}>
                  <Text style={styles.txtAlterar}>Editar</Text>
                </TouchableOpacity>
              </View>
          }
        </KeyboardAvoidingView>
      }
    </>
  );
}
InfoScreen.navigationOptions = {
  header: null,
}

//    <Text>{navigation.getParam('name')}</Text>