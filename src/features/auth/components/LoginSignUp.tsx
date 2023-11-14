import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { type IAuthSetEmailProp, type IPressabelTextProps } from '../types'
import { LoginForm } from './forms/Login'
import { SignUpForm } from './forms/SignUp'

const PressableText = (props: IPressabelTextProps): React.JSX.Element => (
  <Pressable onPress={props.onPress}>
    <Text>{props.text}</Text>
  </Pressable>
)

const PressAbles = styled.View`
  background-color: ${props => props.theme.colors.bg.primary};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 40px;
`
export const LoginSignUp = (props: IAuthSetEmailProp) => {
  const [showLogin, setShowLogin] = useState(true)

  // onPressLogin and onPressSignUp are designed to remove redundant mounting of the forms
  const onPressLogin = () => {
    if (!showLogin) setShowLogin(true)
  }

  const onPressSignUp = () => {
    if (showLogin) setShowLogin(false)
  }

  return (
    <View>
      <PressAbles>
        <PressableText text="Login" onPress={onPressLogin} />
        <PressableText text="Sign Up" onPress={onPressSignUp} />
      </PressAbles>

      <View>
        {showLogin && <LoginForm setEmail={props.setEmail} />}
        {!showLogin && <SignUpForm setEmail={props.setEmail} />}
      </View>
    </View>
  )
}
