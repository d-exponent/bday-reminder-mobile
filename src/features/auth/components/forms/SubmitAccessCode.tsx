import { yupResolver } from '@hookform/resolvers/yup'
import baseAxios, { serverErrorResponseMessageOrGeneric } from 'helpers/api/axios'
import React from 'react'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import yup, { validate, type stringSchema } from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'
import useUserNotification from 'hooks/useUserNotification'
import { Controller, useForm } from 'react-hook-form'

import SmallErrorText from 'components/SmallErrorText'

import { type ISubmitAcccessCodeProps } from '../../types'

const accessCodeSchema = yup
  .object()
  .shape(validate('accessCode') as { accessCode: stringSchema })

export const SubmitAccessCode = (props: ISubmitAcccessCodeProps) => {
  const { loadingAction, setLoadingAction } = useLoading()
  const { showNotification } = useUserNotification()

  const formControl = useForm({
    resolver: yupResolver(accessCodeSchema),
    defaultValues: {
      accessCode: ''
    }
  })

  const {
    formState: { errors }
  } = formControl

  type formData = yup.InferType<typeof accessCodeSchema>

  const onSubmitAccessCodePress = (formData: formData) => {
    setLoadingAction(true)
    baseAxios
      .get(`auth/login/${props.userEmail}/${formData.accessCode}`)
      .then(() => {
        showNotification('Login Succesfull')
        formControl.reset()
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
          name="accessCode"
          control={formControl.control}
          render={({ field }) => (
            <TextInput
              label="Access Code"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.accessCode != null && (
          <SmallErrorText text={errors.accessCode.message} />
        )}
      </View>
      <View>
        <Button
          loading={loadingAction}
          onPress={formControl.handleSubmit(onSubmitAccessCodePress)}
          mode="contained"
        >
          Submit
        </Button>
        <Button onPress={props.exit} mode="contained">
          Go Back
        </Button>
      </View>
    </View>
  )
}
