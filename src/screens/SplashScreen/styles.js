import { StyleSheet } from 'react-native'
import { colors } from '../../metrics'

export const styles = StyleSheet.create({
    
    container: {
        flex:1,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor:colors.loginBackground
    },
    
    img: {
        width: 200,
        height: 200,
    },
    logoText: {
        color: colors.tertiary,
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 2.8
    },
})