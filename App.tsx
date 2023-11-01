import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import AuthContextProvider from 'features/auth/context/authContext'
import React, { type ReactNode } from 'react'
import { StatusBar } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import styled from 'styled-components/native'

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight != null && `padding-top: ${StatusBar.currentHeight}px`};
`

const App = (): ReactNode => {
  return (
    <SafeAreaView>
      <AuthContextProvider>
        <PaperProvider>
          <ExpoStatusBar style="auto" />
        </PaperProvider>
      </AuthContextProvider>
    </SafeAreaView>
  )
}

export default App
