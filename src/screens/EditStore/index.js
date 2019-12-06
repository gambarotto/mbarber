import React, { useEffect, useState } from 'react';
import { View, Text, Picker, TouchableOpacity, Image } from 'react-native';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker'

import { styles } from './styles.js';
import TabBar from '../../components/TabBar'

export default function EditStore( props ) {

  const [lojas, setLojas] = useState(['t2', 't3', 't4'])
  const [lojaAtiva, setLojaAtiva] = useState('')
  const [upImage, setUpImage] = useState('')
  const [upImageUri, setUpImageUri] = useState('')
  const [progressUp, setProgressUp] = useState('')
  const [status, setStatus] = useState('')
  const [urlImageUploaded, setUrlImageUploaded] = useState('')
  /**---------------------------------------------------------------------------------------
   * MÉTODO RESPONSAVEL POR BAIXAR DO FIREBASE A FOTO DA LOJA SELECIONADA
   ---------------------------------------------------------------------------------------*/
  function getCurrencyStore(){

  }

  /**---------------------------------------------------------------------------------------
   * MÉTODO RESPONSAVEL POR ESCOLHER A FOTO NO APARELHO
   ---------------------------------------------------------------------------------------*/
  const options = {
    title: 'teste',
    chooseFromLibraryButtonTitle: 'Escolher foto da Galeria',
    takePhotoButtonTitle: 'Tirar uma Foto'
  }

  function choosePhoto() {
console.log('iiiiuu' )
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      console.log('iiiiuu' )
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setUpImage(source)
        setUpImageUri(response.uri)
        console.log('iiii' + upImageUri);
        
      }
    })
  }

  /**---------------------------------------------------------------------------------------
   * MÉTODO PARA FAZER UPLOAD DA IMAGEM PARA O FIREBASE
   ---------------------------------------------------------------------------------------*/

  async function uploadImage() {
    //alert(JSON.stringify(app))

    const ext = upImageUri.split('/').pop()
    const filename = `teste.${ext}`

    firebase.storage()
      .ref(`barber/${lojaAtiva}/${filename}`)
      .putFile(upImageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    
         // const {bytesTransferred, totalBytes} = snapshot
          setStatus('Enviando')
          setProgressUp((snapshot.bytesTransferred / snapshot.totalBytes) *100)
          
          if(snapshot.state === firebase.storage.TaskState.SUCCESS) {
            setUrlImageUploaded(snapshot.downloadURL)
            setStatus('')
            
          }
        }
      )
  }
    /**---------------------------------------------------------------------------------------
   * MÉTODO PARA FAZER ATUALIZAR OS DADOS DA LOJA NO FIREBASE
   ---------------------------------------------------------------------------------------*/
  async function attDataStore(url){
    const ref = firebase.database().ref('barberInfo')
    ref.update({
      lojaAtiva:{imageUrl:url}
    })
  }

  async function att(){
    await uploadImage()
    await attDataStore(urlImageUploaded)
  }

  return (

    <View style={styles.container} >

      <View style={styles.containerPicker}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={lojaAtiva}
          onValueChange={(itemValue, itemIndex) => setLojaAtiva(itemValue)}
        >
          {lojas &&
            lojas.map((loja, idx) => (
              <Picker.Item
                key={idx}
                label={loja}
                value={loja}
              />
            ))}
        </Picker>
      </View>

      <View style={styles.containerEdit}>
        <Text style={styles.text}>Imagem Atual</Text>
        <View style={styles.containerEditImage}>
          <View style={styles.fotoStore}>
            <Image
              source={require('../../../assets/1.jpg')}
              style={styles.imageStore} />
          </View>
          <View style={styles.containerButtonNewImage}>
            <TouchableOpacity
              style={[styles.buttons, styles.buttonNewImage]}
              onPress={choosePhoto}>
              <Text style={styles.textButtons}>Nova Imagem</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.containerUpdate}>
        <Text style={styles.text}>Nova Imagem</Text>
        <View style={styles.containerUpdatedImage}>
            {upImage ?
              <Image
                source={upImage}
                style={styles.imageStore} />
              :
              <Image
                source={require('../../../assets/upload.png')}
                style={styles.imageStoreUpdate} />
            }
          </View>

   
          <View style={styles.containerUdateButton}>
            <TouchableOpacity
              style={[styles.buttons, !status ? styles.buttonUpdate : styles.buttonUpdating]}
              onPress={att}>
              {status ? 
                (<Text style={[styles.textButtons, styles.textButtonEnviando]}>Enviando...</Text>)
                : 
                (<Text style={styles.textButtons}>Confirmar</Text>)
              }          

            </TouchableOpacity>
          </View>
          <Text>{JSON.stringify(urlImageUploaded)}</Text>
        </View>
      </View>
      <View style={styles.containerButtonsNav}>
        <TabBar props={props}/>
      </View>
    </View>

  );
}
EditStore.navigationOptions = {
  header: null,
  headerTitle: 'oi'
}

//----------barra de progresso------------

// {status && (
//   <View
//   style={[styles.progressBar, { width: `${progressUp}%` }]}
// />
// )}


// {status ? 
//   (<Text>Enviando...</Text>)
//   : 
//   (<Text>Confirmar</Text>)
// }

// <View style={styles.containerUpdate}>
// <Image source={ require('../../../assets/1.jpg')}/>
// <TouchableOpacity style={[styles.buttons, styles.buttonUpdate]}>
//   <Text>Confirmar</Text>
// </TouchableOpacity>
// </View>

// <View style={styles.containerButtonsNav}>
// <TouchableOpacity style={[styles.buttons, styles.buttonEditInfo]}>
//     <Text>Editar Informações</Text>
// </TouchableOpacity>
// </View>


// <View style={styles.containerButtonsNav}>
// <TouchableOpacity style={[styles.buttons, styles.buttonEditInfo]}>
//   <Text>Editar Informações</Text>
// </TouchableOpacity>
// </View>