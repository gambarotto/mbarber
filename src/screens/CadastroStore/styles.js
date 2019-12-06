import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.loginBackground,
        justifyContent:'space-between'       
    },
    containerImage:{
        height:'30%',
        width:'100%',
        marginBottom:10
    },
    imageStore:{
        height:'100%',
        width:'100%'
    },
    textImage:{
        alignSelf:'flex-end',
        fontSize:10,
        color:colors.textTertiary,
        marginRight:10
    },
    input:{
        flex:1,
        paddingHorizontal:10,
        backgroundColor:'rgba(117,117,117,0.1)',
        //backgroundColor:'#f5f5f6',
        maxHeight:50,
        marginTop:10,
        marginLeft:8,
        marginRight:8,
        borderRadius:4,
        color:colors.tertiary
    },
    
    containerButtons:{
        flex:1,
        width:'100%',
        flexDirection:'row', 
        justifyContent:'space-around',
        maxHeight:70,
        padding:10,
        backgroundColor:colors.loginBackground
      //  position:'absolute',
       // bottom:0
    },
    btnCancel:{
        flex:1,
        height:50,
        backgroundColor:colors.tertiary,
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
    },
    btnSalvar:{
        flex:1,
        backgroundColor:colors.tertiary,
        height:50,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
        justifyContent:'center',
        alignItems:'center',
    },
    txt:{
        fontWeight:'bold',
        color:colors.loginBackground
    },
    
    txtNo:{
        fontWeight:'bold',
        color:colors.inputs
    },
    switch:{ 
        flex: 1, 
        flexDirection:'row',
        //backgroundColor:'#fff',
        maxHeight: 60,
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        elevation:5
    },
    txtSwitch: {
        color:colors.primary,
        fontSize:16,
        fontWeight:'bold',
    }

})
 