import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#111'
    },
    containerSearch:{
        height: 60,
        backgroundColor: colors.inputColor,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        
    },
    inputSearch:{
        flex:1,
        borderWidth:0,
        color:colors.tertiary,
        paddingHorizontal:10,
        letterSpacing:2.8
    },
    inputContainerSearch:{
        backgroundColor:colors.tertiary,
        borderRadius:24,
        borderWidth:0
    },

    containerItem: {
        width:'100%',
        height:70,
        backgroundColor:colors.loginBackground,
        padding:5,
        paddingLeft:10,
        flexDirection:'row',
        marginBottom:1,
    },

    containerImage:{
        borderRadius:24
    },

    picture:{
        height:60,
        width:60,
        resizeMode:"cover",
        borderRadius:30,
        borderColor:colors.tertiary,
        borderWidth:1,
    },
    containerInfos:{
        flex:1,
        flexDirection:'column',
        paddingLeft:10,
        backgroundColor:colors.loginBackground
    },
    name: {
        fontWeight:'bold',
        fontSize:16,
        marginBottom:2,
        color:colors.textPrimary
    },
    phone:{
        //paddingLeft:10,
        fontSize:12,
        paddingLeft:5,
        color:colors.textTertiary
    },
    address:{
        //paddingLeft:10,
        fontSize:11,
        paddingLeft:5,
        color:colors.textSecondary
    },
    addStore: {
        zIndex:5,
        elevation:5,
        display:'flex',
        position:'absolute',
        bottom:15,
        right:15,
        backgroundColor:colors.primary,
        height:60,
        width:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    addText: {
        fontSize:26,
        fontWeight:'bold',
        color:'#fff'
    },
    iconLogout:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        padding: 5,
        borderBottomWidth:0,
        borderColor:'#ddd',
    },
    isActive: {
        width:5,
        //borderRadius:4
        borderTopRightRadius:8,
        borderBottomRightRadius:8

    }

}) 