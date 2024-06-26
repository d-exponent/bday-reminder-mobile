import { yupResolver } from '@hookform/resolvers/yup'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import styled from 'styled-components/native'

import { TextInPutWithErrorText, type Errors } from 'components/forms/text-input-with-error-text.components'

import baseAxios, { getErrorMessage, getSuccessMessage } from 'helpers/api/axios'
import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'

import { SafeAreaKeyBoardAviodingView } from 'components/wrappers/safe-area-keyboard-avoiding-view.component'
import useUserNotification from 'hooks/useUserNotification'

import { type StackNavigatorsList } from 'navigators/types'

import { InputWrapper, Screen, SquareButton } from '../styles'

const GotoLoginPressable = styled(Pressable)`
  flex-direction: row;
  justify-content: space-around;
  padding: ${props => props.theme.space[3]};
`
const LoginAccountText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.colors.brand.primary};
  text-decoration: underline;
`

const signUpDataSchema = yup.object().shape(
  validate('email', 'name', 'phone') as {
    email: stringSchema
    name: stringSchema
    phone: stringSchema
  }
)

type Props = NativeStackScreenProps<StackNavigatorsList, 'SignUp'>

const SignUpForm = (props: Props) => {
  const { loadingAction, setLoadingAction } = useLoading()
  const { showNotification } = useUserNotification()

  const formControl = useForm({
    resolver: yupResolver(signUpDataSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: ''
    }
  })

  const {
    formState: { errors }
  } = formControl

  type formData = yup.InferType<typeof signUpDataSchema>

  const onSignUpPress = (formData: formData) => {
    setLoadingAction(true)
    let message
    baseAxios
      .post('users/me/sign-up', formData)
      .then(response => {
        formControl.reset()
        message = getSuccessMessage(response)
        showNotification(message)
        setLoadingAction(false)
        props.navigation.navigate('SubmitAccessCode', {
          userEmail: response.data.data.email
        })
      })
      .catch(e => {
        message = getErrorMessage(e)
        showNotification(message)
        setLoadingAction(false)
      })
  }

  return (
    <SafeAreaKeyBoardAviodingView>
      <Screen>
        <View>
          <InputWrapper>
            <Controller
              control={formControl.control}
              name="name"
              render={({ field }) => (
                <TextInPutWithErrorText
                  label="Full Names"
                  value={field.value}
                  onChangeText={field.onChange}
                  errors={errors.name as Errors}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Controller
              control={formControl.control}
              name="email"
              render={({ field }) => (
                <TextInPutWithErrorText
                  label="Email Address"
                  value={field.value}
                  onChangeText={field.onChange}
                  errors={errors.email as Errors}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Controller
              control={formControl.control}
              name="phone"
              render={({ field }) => (
                <TextInPutWithErrorText
                  label="Phone Number format +123#########"
                  value={field.value}
                  onChangeText={field.onChange}
                  errors={errors.phone as Errors}
                />
              )}
            />
          </InputWrapper>
        </View>

        <SquareButton loading={loadingAction} onPress={formControl.handleSubmit(onSignUpPress)} text="SIGN UP" />

        <GotoLoginPressable onPressIn={() => props.navigation.navigate('Login')}>
          <LoginAccountText>Login to existing account?</LoginAccountText>
        </GotoLoginPressable>
      </Screen>
    </SafeAreaKeyBoardAviodingView>
  )
}

export default SignUpForm
