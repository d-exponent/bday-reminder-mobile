import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UploadBirthdayForm from 'features/birthdays/screens/upload-new-birthday.screen'
import Home from 'screens/home.screen'
import Login from 'features/authentication/screens/get-access-code.component'
import SignUp from 'features/authentication/screens/sign-up.component'
import SubmitAccessCode from '../features/authentication/screens/submit-access-code.component'
import { type StackNavigatorsList } from './types'

import TabNavigators from './tab.navigators'

const Stack = createNativeStackNavigator<StackNavigatorsList>()

const StackNavigators = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UploadNewBirthday" component={UploadBirthdayForm} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SubmitAccessCode" component={SubmitAccessCode} />
      <Stack.Screen name="Main" component={TabNavigators} />
    </Stack.Navigator>
  )
}

export default StackNavigators
