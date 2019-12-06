import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    containerItem: {
        flex:1,
        //display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.tab
        // borderColor:'#f4f4f4',
        // borderWidth:1,
    },
    item: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
        // borderColor:'#f4f4f4',
        // borderWidth:1,
    },
    text:{
        color:colors.secondary,
    }
})