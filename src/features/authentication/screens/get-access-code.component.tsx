import { yupResolver } from '@hookform/resolvers/yup'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'

import { SafeAreaKeyBoardAviodingView } from 'components/wrappers/safe-area-keyboard-avoiding-view.component'
import { TextInPutWithErrorText, type Errors } from 'components/forms/text-input-with-error-text.components'
import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'
import useUserNotification from 'hooks/useUserNotification'
import { type StackNavigatorsList } from 'navigators/types'

import baseAxios, { getErrorMessage, getSuccessMessage } from 'helpers/api/axios'

import { GotoOtherFormText, InputWrapper, Screen, SquareButton, WelcomeHeader } from '../styles'

const GotoSignUpPressable = styled(Pressable)`
  flex-direction: row;
  justify-content: space-around;
  padding: ${props => props.theme.space[3]};
`

const loginDataSchema = yup.object().shape(validate('email') as { email: stringSchema })

type Props = NativeStackScreenProps<StackNavigatorsList, 'Login'>

const GetAccessCodeForm = (props: Props) => {
  const { loadingAction, setLoadingAction } = useLoading()
  const { showNotification } = useUserNotification()

  const formControl = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(loginDataSchema)
  })

  const {
    formState: { errors }
  } = formControl

  type formData = yup.InferType<typeof loginDataSchema>

  const onLoginPress = async (formData: formData) => {
    setLoadingAction(true)
    const userEmail = formData.email.toLowerCase()

    try {
      const response = await baseAxios.get(`auth/${userEmail}`)

      showNotification(getSuccessMessage(response))
      setLoadingAction(false)

      formControl.reset()
      props.navigation.navigate('SubmitAccessCode', { userEmail })
    } catch (e) {
      showNotification(getErrorMessage(e))
      setLoadingAction(false)
    }
  }

  return (
    <SafeAreaKeyBoardAviodingView>
      <Screen>
        <WelcomeHeader>Welcome Back</WelcomeHeader>
        <InputWrapper>
          <Controller
            name="email"
            control={formControl.control}
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

        <SquareButton
          loading={loadingAction}
          mode="contained"
          onPress={formControl.handleSubmit(onLoginPress)}
          text="LOGIN"
        />
        <GotoSignUpPressable onPressIn={() => props.navigation.navigate('SignUp')}>
          <GotoOtherFormText>Create a new Account?</GotoOtherFormText>
        </GotoSignUpPressable>
      </Screen>
    </SafeAreaKeyBoardAviodingView>
  )
}

export default GetAccessCodeForm
