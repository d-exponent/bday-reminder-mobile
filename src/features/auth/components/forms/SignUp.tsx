import React from 'react'
import { View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'

import baseAxios, { serverErrorResponseMessageOrGeneric } from 'helpers/api/axios'
import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'

import SmallErrorText from 'components/SmallErrorText'
import useUserNotification from 'hooks/useUserNotification'

import { type IAuthSetEmailProp } from '../../types'

const signUpDataSchema = yup.object().shape(
  validate('email', 'name', 'phone') as {
    email: stringSchema
    name: stringSchema
    phone: stringSchema
  }
)

export const SignUpForm = (props: IAuthSetEmailProp) => {
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
    baseAxios
      .post('users/me/sign-up', formData)
      .then(() => {
        formControl.reset()
        props.setEmail(formData.email.toLowerCase())
        showNotification('Sign up successfull 🎉')
      })
      .catch(e => {
        setLoadingAction(false)
        const message = serverErrorResponseMessageOrGeneric(e)
        showNotification(message)
      })
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
        {errors.name != null && <SmallErrorText text={errors.name.message} />}

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
        {errors.email != null && <SmallErrorText text={errors.email.message} />}

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
        {errors.phone != null && <SmallErrorText text={errors.phone.message} />}
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
