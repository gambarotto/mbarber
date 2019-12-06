import { StyleSheet } from 'react-native'
import {colors} from '../../metrics'

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.loginBackground,
        padding:20,
    },
    img: {
        width:200,
        height:200,

    
      },
      containerImg: {
          alignItems: 'center',
          flexGrow:1,
          justifyContent:'center',
          marginBottom:15,
      },
      logoText: {
          color:colors.tertiary,
          fontWeight:'bold',
          fontSize:20,
          letterSpacing:2.8
      },
      inputs: {
          height:45,
          backgroundColor: 'rgba(255,255,255,0.1)',
          marginBottom:15,
          borderRadius: 4,
          paddingHorizontal:10,
          color: colors.tertiary,
      },

      containerButton: {
          height: 50,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: colors.primary,
          borderRadius: 4,
          marginTop:10,
          marginBottom:20
      },
      textButton:{
          color:colors.tertiary,
          fontWeight:'bold',
          letterSpacing:2.8
      }
})




