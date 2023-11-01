import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import baseAxios from 'helpers/api/axios'
import useLoading from 'hooks/useLoading'
import yup, { validate, type stringSchema } from 'validations/yup-config'

const signUpDataSchema = yup.object().shape(
  validate('email', 'name', 'phone') as {
    email: stringSchema
    name: stringSchema
    phone: stringSchema
  }
)

export const SignUpForm = () => {
  const { loadingAction, setLoadingAction } = useLoading()

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
    baseAxios
      .post('users/me/sign-up', formData)
      .then(() => console.log('done'))
      .catch(_ => setLoadingAction(false))
  }

  return (
    <View>
      <View>
        <Controller
          control={formControl.control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="Full Names"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.name != null && <Text>{errors.name.message}</Text>}

        <Controller
          control={formControl.control}
          name="email"
          render={({ field }) => (
            <TextInput
              label="Email Address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.email != null && <Text>{errors.email.message}</Text>}

        <Controller
          control={formControl.control}
          name="phone"
          render={({ field }) => (
            <TextInput
              label="Phone Number format +123#########"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.phone != null && <Text>{errors.phone.message}</Text>}
      </View>

      <Button
        loading={loadingAction}
        mode="contained"
        onPress={formControl.handleSubmit(onSignUpPress)}
      >
        Sign up
      </Button>
    </View>
  )
}
