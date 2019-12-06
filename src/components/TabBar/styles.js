import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //borderTopColor:colorsRgba.secondary,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    }
})