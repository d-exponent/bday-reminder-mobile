import { SmallErrorText } from 'components/ui/small-error-text.component'
import React from 'react'
import { TextInput } from 'react-native-paper'

export interface Errors {
  message: string
}

interface Props {
  label: string
  value: string
  onChangeText: (...event: any[]) => void
  errors: Errors
}

export const TextInPutWithErrorText = (props: Props) => {
  return (
    <>
      <TextInput
        label={props.label}
        value={props.value}
        error={props.errors != null}
        onChangeText={props.onChangeText}
      />
      {props.errors != null && <SmallErrorText text={props.errors.message} />}
    </>
  )
}
