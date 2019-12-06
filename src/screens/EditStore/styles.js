import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.background,
    },

    containerSegundo: {
        flex:1,
        padding:20,
    },
    containerPicker:{
      marginBottom:10
    },

      picker: {
        backgroundColor:colors.tab,  
        color:colors.secondary,
        width:'100%',
        borderRadius:4,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,    
      },
      
      containerEdit: {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20
      },
      containerEditImage: {
        flex:1,
        flexDirection: 'row',
        maxHeight:'20%',
        marginTop:10,
        marginBottom:10,
        minHeight:'20%',    
      },
      fotoStore: {
        flex:1,
        borderWidth:1,
        borderRadius:4,
        borderColor:colors.tab
      },
      imageStore:{
          width:'100%',
          height:'100%',
          borderRadius:4,
          
      },
      imageStoreUpdate:{
        width:'100%',
        height:'100%',
        borderRadius:4,
        opacity:0.1
      },
      containerButtonNewImage: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonNewImage: {
        backgroundColor: colors.secondary,
        padding:20
      },
      containerUpdate: {
        flex:1,
        flexDirection:'column',
      },
      containerUpdatedImage:{
        flex:1,
        height:'60%',
        borderWidth:1,
        borderRadius:4,
        marginTop:10,
        borderColor:colors.tab
      },
      containerUdateButton:{
        marginTop:10,
        //maxWidth:'50%',
      },
      buttonUpdate: {
        backgroundColor:colors.secondary,
        padding:20,
        alignItems:'center'
      },
      containerButtonsNav:{
        display:'flex',
        flex:1,
        marginTop:10,
        maxHeight:'8%',
      },

      buttons:{
          borderRadius:4,
          padding:20,
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 5,
          borderColor: colors.secondary,
      },
      textButtons: {
        fontSize:18,
        fontWeight:'bold',
        color: colors.background
      },
      textButtonEnviando: {
        color:colors.secondary
      },
      buttonUpdating: {
        backgroundColor:colors.background
      },
      text: {
        //alignSelf:'center',
        color:colors.primary,
        fontWeight:'bold',
      },
      progressBar:{
        backgroundColor: 'rgb(3, 154, 229)',
        height: 3,
        shadowColor: '#000',
      }

})




