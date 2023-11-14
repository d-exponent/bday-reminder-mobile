import React from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { StatusBar } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import styled from 'styled-components/native'

import AuthContextProvider from 'context/AuthContext'
import ThemeContextProvider from 'context/ThemeContext'
import UserNotificationContextProvider from 'context/UserNotificationContext'

import UserAuth from 'features/auth/screens/UserAuthentication'

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight !== null && `padding-top: ${StatusBar.currentHeight}px`};
  background-color: ${props => props.theme.colors.bg.secondary};
`

const Screen = styled.View`
  flex: 1;
  border: 3px solid gray;
`

const App = () => {
  return (
    <SafeAreaView>
      <ThemeContextProvider>
        <AuthContextProvider>
          <PaperProvider>
            <UserNotificationContextProvider>
              <Screen>
                <>
                  <UserAuth />
                  <ExpoStatusBar style="auto" />
                </>
              </Screen>
            </UserNotificationContextProvider>
          </PaperProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </SafeAreaView>
  )
}

export default App
