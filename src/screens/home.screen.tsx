/* eslint-disable @typescript-eslint/no-var-requires */
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button } from 'react-native-paper'
import { Asset } from 'expo-asset'
import styled from 'styled-components/native'

import SafeAreaBox from 'components/wrappers/safe-area-box.component'
import useUserAuthentication from 'features/authentication/hooks/useUserAuthentication'
import { type StackNavigatorsList } from 'navigators/types'

const Container = styled.View`
  flex: 1;
`

const BackGroundImage = styled.ImageBackground`
  flex: 1;
`

const WelcomeBox = styled.View`
  flex: 3;
`

const WelcomeHeaderBox = styled.View`
  flex: 1;
  justify-content: center;
`

const WelcomeHeader = styled.Text`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.h4};
  color: ${props => props.theme.colors.text.inverse};
`

const WelcomeMessageBox = styled.View`
  flex: 1;
`

const WelcomeMessage = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.text.inverse};
  font-size: ${props => props.theme.fontSizes.body};
`

const GotoAuthButtonsBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

type Props = NativeStackScreenProps<StackNavigatorsList, 'Home'>

//  Current Background Image (welcome.jpg) by Gerald Berliner. https://unsplash.com/@geraberl
const { uri } = Asset.fromModule(require('../../assets/welcome.jpg'))

const Home = (props: Props) => {
  const { authStatus } = useUserAuthentication()

  React.useEffect(() => {
    authStatus === true && props.navigation.navigate('Main')
  }, [authStatus])

  const goto = (page: 'Login' | 'SignUp') => () => props.navigation.navigate(page)

  return (
    <Container>
      <BackGroundImage source={{ uri }} resizeMode="cover">
        <SafeAreaBox>
          <WelcomeBox>
            <WelcomeHeaderBox>
              <WelcomeHeader>Eclipse Birthday Reminder</WelcomeHeader>
            </WelcomeHeaderBox>
            <WelcomeMessageBox>
              <WelcomeMessage>
                This is where we ensure that you never forget the birthdays of your
                loved ones. We have got your back 24/7 working tirelessly to ensure
                that you get that notification to remeber.
              </WelcomeMessage>
            </WelcomeMessageBox>
          </WelcomeBox>

          {authStatus === false && (
            <GotoAuthButtonsBox>
              <Button onPressIn={goto('Login')} mode="outlined">
                Login
              </Button>
              <Button onPressIn={goto('SignUp')} mode="outlined">
                Sign Up
              </Button>
            </GotoAuthButtonsBox>
          )}
        </SafeAreaBox>
      </BackGroundImage>
    </Container>
  )
}

export default Home
