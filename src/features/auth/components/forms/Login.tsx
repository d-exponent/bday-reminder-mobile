import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import baseAxios, { serverErrorResponseMessageOrGeneric } from 'helpers/api/axios'
import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'

import SmallErrorText from 'components/SmallErrorText'

import { type IAuthSetEmailProp } from '../../types'
import useUserNotification from 'hooks/useUserNotification'

const loginDataSchema = yup
  .object()
  .shape(validate('email') as { email: stringSchema })

export const LoginForm = (props: IAuthSetEmailProp) => {
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

  const onLoginPress = (formData: formData) => {
    setLoadingAction(true)
    baseAxios
      .get(`auth/${formData.email}`)
      .then(() => {
        formControl.reset()
        props.setEmail(formData.email.toLowerCase())
        showNotification(`An acesss code is sent to ${formData.email.toLowerCase()}`)
      })
      .catch(e => {
        setLoadingAction(false)
        const message = serverErrorResponseMessageOrGeneric(e)
        showNotification(message)
      })
  }

  return (
    <View>
      <Controller
        name="email"
        control={formControl.control}
        render={({ field }) => (
          <TextInput
            label="Email Address"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.email != null && <SmallErrorText text={errors.email.message} />}

      <Button
        loading={loadingAction}
        mode="contained"
        onPress={formControl.handleSubmit(onLoginPress)}
      >
        Login
      </Button>
    </View>
  )
}
