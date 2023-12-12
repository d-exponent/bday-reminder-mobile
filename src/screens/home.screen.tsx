import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

import SafeAreaBox from 'components/wrappers/safe-area-box.component'
import useUserAuthentication from 'features/authentication/hooks/useUserAuthentication'
import { type StackNavigatorsList } from 'navigators/types'

const Container = styled.View`
  flex: 1;
`

const BackGroundImageContainer = styled.ImageBackground`
  flex: 1;
`

const WelcomeContainer = styled.View`
  flex: 3;
`

const WelcomeHeaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`

const WelcomeHeaderText = styled.Text`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.h4};
  color: ${props => props.theme.colors.text.inverse};
`

const WelcomeMessageContainer = styled.View`
  flex: 1;
`

const WelcomeMessageText = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.text.inverse};
  font-size: ${props => props.theme.fontSizes.body};
`

const CallToActionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

type Props = NativeStackScreenProps<StackNavigatorsList, 'Home'>

const TEMP_URI =
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFya3xlbnwwfHwwfHx8MA%3D%3D'

const Home = (props: Props) => {
  const { authStatus } = useUserAuthentication()

  React.useEffect(() => {
    if (authStatus === true) {
      props.navigation.navigate('Main')
    }
  }, [authStatus])

  const gotoLogin = () => props.navigation.navigate('Login')
  const gotoSignUp = () => props.navigation.navigate('SignUp')

  return (
    <Container>
      <BackGroundImageContainer source={{ uri: TEMP_URI }} resizeMode="cover">
        <SafeAreaBox>
          <WelcomeContainer>
            <WelcomeHeaderContainer>
              <WelcomeHeaderText>Eclipse Birthday Reminder</WelcomeHeaderText>
            </WelcomeHeaderContainer>
            <WelcomeMessageContainer>
              <WelcomeMessageText>
                This is where we ensure that you never forget the birthdays of your
                loved oned ever again. We have got your back 24/7 working tirelessly
                to ensure that you get that call to rem,en
              </WelcomeMessageText>
            </WelcomeMessageContainer>
          </WelcomeContainer>

          {authStatus === false && (
            <CallToActionContainer>
              <Button onPressIn={gotoLogin} mode="outlined">
                Login
              </Button>
              <Button onPressIn={gotoSignUp} mode="outlined">
                Sign Up
              </Button>
            </CallToActionContainer>
          )}
        </SafeAreaBox>
      </BackGroundImageContainer>
    </Container>
  )
}

export default Home
