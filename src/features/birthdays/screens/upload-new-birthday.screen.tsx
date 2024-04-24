import { yupResolver } from '@hookform/resolvers/yup'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

import yup from 'helpers/validations/yup-config'
import useLoading from 'hooks/useLoading'
import useUserNotification from 'hooks/useUserNotification'

import { ButtonWithHideKeyboard } from 'components/helpers/button-with-hide-keyboard.component'
import { SafeAreaKeyBoardAviodingView } from 'components/wrappers/safe-area-keyboard-avoiding-view.component'
import {
  type Errors,
  TextInPutWithErrorText
} from 'components/forms/text-input-with-error-text.components'
import { handleFetchErrorMessage } from 'helpers/api/axios'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { type StackNavigatorsList } from 'navigators/types'

// YUP CONFIGURATION START
const positiveYupIntegers = (min: number, max: number) =>
  yup.number().positive().integer().min(min).max(max)

const optionalYupString = () => yup.string().optional()

const birthdaySchema = yup.object({
  name: yup.string().required('A birthday must have a name'),
  month: positiveYupIntegers(1, 12).required('A birthday must have a month'),
  day: positiveYupIntegers(1, 31).required('A birthday must have a day'),
  phone: yup.string().phone().optional(),
  email: optionalYupString().email(),
  comments: optionalYupString()
})
// YUP CONFIGURATION END
type Props = NativeStackScreenProps<StackNavigatorsList, 'UploadNewBirthday'>

const UploadBirthdayForm = (props: Props) => {
  const [imageUri, setImageUri] = React.useState<string | null>(null)
  const [disableSignUpBtn, setDisableSignUpBtn] = React.useState(false)

  const axiosPrivate = useAxiosPrivate()
  const { showNotification } = useUserNotification()
  const { loadingAction, setLoadingAction } = useLoading()

  const onPickImagePress = async () => {
    setDisableSignUpBtn(true)
    const action = imageUri === null ? 'saved' : 'updated'

    const imagePickerParams: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    }

    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync(imagePickerParams)

      if (pickerResult.canceled) throw new Error()

      setImageUri(pickerResult.assets[0].uri)
      showNotification(`The image was ${action} successfully`)
    } catch (_) {
      showNotification(`Image could not be ${action}`)
    }
    setDisableSignUpBtn(false)
  }

  const formControl = useForm({
    resolver: yupResolver(birthdaySchema),
    defaultValues: {
      name: '',
      month: 1,
      day: 1,
      phone: '',
      email: '',
      comments: ''
    }
  })

  const {
    formState: { errors }
  } = formControl

  const uploadBirthday = async (birthdayData: FormData) => {
    try {
      showNotification('uploading birthday')
      const url = 'users/me/birthdays'
      const response = await axiosPrivate.post(url, birthdayData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      showNotification(
        `${response.data.data.name}'s birthday was added successfully`
      )
    } catch (e) {
      showNotification(handleFetchErrorMessage(e))
    }
    setLoadingAction(false)
  }

  const onUploadBirthdayPress = async (
    data: yup.InferType<typeof birthdaySchema>
  ) => {
    setLoadingAction(true)
    showNotification('Processing...')
    const formData = new FormData()

    if (typeof imageUri === 'string') formData.append('cover', imageUri)

    // Some fields are optional hence this mildly elaborate setup.
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formData.append(key, value.toString())
      }
    })

    await uploadBirthday(formData)
  }

  return (
    <SafeAreaKeyBoardAviodingView>
      <View>
        <View>
          <Controller
            control={formControl.control}
            name="name"
            render={({ field }) => (
              <TextInPutWithErrorText
                label="Name"
                value={field.value}
                onChangeText={field.onChange}
                errors={errors.name as Errors}
              />
            )}
          />

          <View>
            <Controller
              control={formControl.control}
              name="day"
              render={({ field }) => (
                <TextInPutWithErrorText
                  label="Day 1 - 31"
                  value={field.value + ''}
                  onChangeText={field.onChange}
                  errors={errors.day as Errors}
                />
              )}
            />

            <Controller
              control={formControl.control}
              name="month"
              render={({ field }) => (
                <TextInPutWithErrorText
                  label="Month 1 - 12"
                  value={field.value + ''}
                  onChangeText={field.onChange}
                  errors={errors.month as Errors}
                />
              )}
            />
          </View>

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

          <Controller
            control={formControl.control}
            name="comments"
            render={({ field }) => (
              <TextInPutWithErrorText
                multiline={true}
                numberOfLines={7}
                label="Say something special"
                value={field.value}
                onChangeText={field.onChange}
                errors={errors.comments as Errors}
              />
            )}
          />
        </View>

        <View>
          <ButtonWithHideKeyboard
            onPress={onPickImagePress}
            text={imageUri == null ? 'Add Photo' : 'Change photo'}
          />

          <ButtonWithHideKeyboard
            loading={loadingAction}
            disabled={disableSignUpBtn}
            onPress={formControl.handleSubmit(onUploadBirthdayPress)}
            text="UPLOAD"
          />
        </View>
      </View>
    </SafeAreaKeyBoardAviodingView>
  )
}

export default UploadBirthdayForm
