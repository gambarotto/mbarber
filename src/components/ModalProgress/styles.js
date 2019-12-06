import { StyleSheet } from 'react-native'
import { colors, colorsRgba } from '../../metrics'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin:20
    },
    modal
    : {
        width: '100%',
        height: '30%',
        padding: 10,
        borderRadius: 4,
        elevation: 5,
        backgroundColor:colors.textPrimary,
        justifyContent:'space-between',
        alignItems:'center'
    },
    txtHeader: {
        fontSize:15,
        fontWeight:'bold',
        color:colors.inputColor
    },
    txtBtnOk: {
        fontSize:15,
        fontWeight:'bold',
        color:colors.inputColor
    }

})