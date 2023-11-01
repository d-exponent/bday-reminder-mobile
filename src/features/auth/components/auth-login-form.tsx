import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import baseAxios from 'helpers/api/axios'
import useLoading from 'hooks/useLoading'
import yup, { type stringSchema, validate } from 'validations/yup-config'

const loginDataSchema = yup
  .object()
  .shape(validate('email') as { email: stringSchema })

export const LoginForm = () => {
  const { loadingAction, setLoadingAction } = useLoading()

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
      .then(res => console.log(res))
      .catch(_ => setLoadingAction(false))
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
      {errors.email != null && <Text>{errors.email.message}</Text>}

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
