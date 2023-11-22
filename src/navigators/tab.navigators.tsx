import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import UserProfile from 'features/profile/screens/user-profile.screen'
import Birthdays from 'features/birthdays/screens/view-birthdays.screen'
import { type BottomTabNavigatorsList } from './types'

const Tab = createBottomTabNavigator<BottomTabNavigatorsList>()

const TabNavigators = () => {
  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Birthdays" component={Birthdays} />
    </Tab.Navigator>
  )
}

export default TabNavigators
