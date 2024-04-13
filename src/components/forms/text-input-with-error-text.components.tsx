import React from 'react'
import { TextInput, HelperText } from 'react-native-paper'

export interface Errors {
  message: string
}

interface Props {
  multiline?: boolean
  numberOfLines?: number
  label: string
  value: string | undefined
  onChangeText: (...event: any[]) => void
  errors: Errors
}

export const TextInPutWithErrorText = (props: Props) => {
  return (
    <>
      <TextInput
        multiline={props.multiline ?? false}
        numberOfLines={props.numberOfLines ?? 1}
        label={props.label}
        value={props.value}
        error={props.errors != null}
        onChangeText={props.onChangeText}
      />
      <HelperText type="error" visible={props.errors != null}>
        {props.errors?.message}
      </HelperText>
    </>
  )
}
