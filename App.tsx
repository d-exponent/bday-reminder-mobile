import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import StyledComponentsThemeProvider from 'context/StyledComponentsThemeContext'
import UserNotificationProvider from 'context/UserNotificationContext'
import AuthenticationProvider from 'features/authentication/context/AuthenticationProvider'

import StackNavigators from 'navigators/stack.navigators'

const App = () => {
  return (
    <PaperProvider>
      <StyledComponentsThemeProvider>
        <UserNotificationProvider>
          <AuthenticationProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <StackNavigators />
              </NavigationContainer>
            </SafeAreaProvider>
          </AuthenticationProvider>
        </UserNotificationProvider>
      </StyledComponentsThemeProvider>
    </PaperProvider>
  )
}

export default App
