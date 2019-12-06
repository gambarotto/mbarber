import React, { useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

//import Icon from 'react-native-vector-icons/EvilIcons'
import { StatusBar, View } from 'react-native'
import Login from './src/screens/Login'
import InfoScreen from './src/screens/InfoScreen'
import ListStore from './src/screens/ListStore'
import CadastroStore from './src/screens/CadastroStore'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import SplashScreen from './src/screens/SplashScreen'

import { colors } from './src/metrics'

const AuthStack = createStackNavigator({
  Login: Login
})

const AppStack = createStackNavigator({
  //Login: Login,
  //EditStore: EditStore,
  ListStore: {
    screen:ListStore, 
    navigationOptions: {
      header:null
    }},
  InfoScreen: InfoScreen,
  CadastroStore: CadastroStore,
  AuthLoading:AuthLoadingScreen
  //InfoScreen: BottomTab
}, {
  initialRouteName: 'ListStore',
})

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Splash:SplashScreen,
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },{
    initialRouteName: 'Splash',
    //resetOnBlur:false,
    //backBehavior:'history'
  })
)

export default function App() {

  return (
    <>
      <StatusBar backgroundColor={colors.statusBar} barStyle='light-content' />
      <AppContainer />
    </>
  )
}

/**
 * barberInfo > idStore > {objStore}
 * 
 * inicializacao app > verifica se sync true/false
 */