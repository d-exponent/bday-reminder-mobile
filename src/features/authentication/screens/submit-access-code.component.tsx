import { yupResolver } from '@hookform/resolvers/yup'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

import baseAxios, { handleFetchErrorMessage } from 'helpers/api/axios'
import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'
import useUserNotification from 'hooks/useUserNotification'
import { Controller, useForm } from 'react-hook-form'

import useUserAuthentication from 'features/authentication/hooks/useUserAuthentication'
import { handleSaveTokens } from 'helpers/api/tokenStorage'

import {
  TextInPutWithErrorText,
  type Errors
} from 'components/forms/text-input-with-error-text.components'
import { SafeAreaKeyBoardAviodingView } from 'components/wrappers/safe-area-keyboard-avoiding-view.component'
import { type StackNavigatorsList } from 'navigators/types'
import { SquareButton } from '../styles'

const accessCodeSchema = yup
  .object()
  .shape(validate('accessCode') as { accessCode: stringSchema })

type Props = NativeStackScreenProps<StackNavigatorsList, 'SubmitAccessCode'>

export const SubmitAccessCodeForm = (props: Props) => {
  const { showNotification } = useUserNotification()
  const { changeAuthStatusTo } = useUserAuthentication()
  const { loadingAction, setLoadingAction } = useLoading()

  const formControl = useForm({
    resolver: yupResolver(accessCodeSchema),
    defaultValues: { accessCode: '' }
  })

  const {
    formState: { errors }
  } = formControl

  type formData = yup.InferType<typeof accessCodeSchema>

  const onSubmitAccessCodePress = (formData: formData) => {
    setLoadingAction(true)
    const { userEmail } = props.route.params
    baseAxios
      .get(`auth/login/${userEmail}/${formData.accessCode}`)
      .then(async response => {
        setLoadingAction(false)
        try {
          await handleSaveTokens({
            refreshToken: response.data.refreshToken,
            accessToken: response.data.accessToken
          })
          changeAuthStatusTo(true)
          showNotification('Login Succesfull')
          formControl.reset()
          props.navigation.navigate('Main')
        } catch (e) {
          setLoadingAction(false)
          return await Promise.reject(e)
        }
      })
      .catch(e => {
        const message = handleFetchErrorMessage(e)
        showNotification(message)
        setLoadingAction(false)
      })
  }

  return (
    <SafeAreaKeyBoardAviodingView>
      <View>
        <View>
          <Controller
            name="accessCode"
            control={formControl.control}
            render={({ field }) => (
              <TextInPutWithErrorText
                label="Access Code"
                value={field.value}
                onChangeText={field.onChange}
                errors={errors.accessCode as Errors}
              />
            )}
          />
        </View>
        <View>
          <SquareButton
            loading={loadingAction}
            onPress={formControl.handleSubmit(onSubmitAccessCodePress)}
            text="SUBMIT ACCESS CODE"
          />
          <SquareButton onPress={() => props.navigation.goBack()} text="Go Back" />
        </View>
      </View>
    </SafeAreaKeyBoardAviodingView>
  )
}

export default SubmitAccessCodeForm
