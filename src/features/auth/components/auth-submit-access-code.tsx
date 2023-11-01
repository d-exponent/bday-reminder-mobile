import { yupResolver } from '@hookform/resolvers/yup'
import baseAxios from 'helpers/api/axios'
import React from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import useLoading from 'hooks/useLoading'
import { Controller, useForm } from 'react-hook-form'
import yup, { validate, type stringSchema } from 'validations/yup-config'

const accessCodeSchema = yup
  .object()
  .shape(validate('accessCode') as { accessCode: stringSchema })

export const SubmitAccessCode = () => {
  const { loadingAction, setLoadingAction } = useLoading()

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
      .get(`auth/login/dummyemail.com/${formData.accessCode}`)
      .then(res => console.log(res))
      .catch(e => setLoadingAction(false))
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
        {errors.accessCode != null && <Text>{errors.accessCode.message}</Text>}
      </View>
      <Button
        loading={loadingAction}
        onPress={formControl.handleSubmit(onSubmitAccessCodePress)}
        mode="contained"
      >
        Submit
      </Button>
    </View>
  )
}
