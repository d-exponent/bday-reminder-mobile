import { type BottomTabScreenProps as BTS } from '@react-navigation/bottom-tabs'
import SafeAreaBox from 'components/wrappers/safe-area-box.component'
import React from 'react'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

import useUserAuthentication from 'features/authentication/hooks/useUserAuthentication'
import {
  type BottomTabNavigatorsList,
  type StackNavigatorsList
} from 'navigators/types'

const CenteredSafeBox = styled.View`
  background-color: red;
  justify-content: center;
  flex: 1;
`

type Props = BTS<BottomTabNavigatorsList & StackNavigatorsList, 'Profile'>

const UserProfile = (props: Props) => {
  const { logout } = useUserAuthentication()

  const goHome = () => props.navigation.navigate('Home')

  const onLogoutPress = () => {
    logout().then(goHome).catch(goHome)
  }
  return (
    <SafeAreaBox>
      <CenteredSafeBox>
        <Button onPressIn={onLogoutPress}>Logout</Button>
      </CenteredSafeBox>
    </SafeAreaBox>
  )
}

export default UserProfile
