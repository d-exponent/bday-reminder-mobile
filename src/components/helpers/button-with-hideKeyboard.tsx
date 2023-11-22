import { hideKeyboard } from 'helpers/utils'
import React from 'react'
import { Button } from 'react-native-paper'

type Mode =
  | 'text'
  | 'contained'
  | 'outlined'
  | 'elevated'
  | 'contained-tonal'
  | undefined

interface Props {
  loading?: boolean
  text: string
  mode?: Mode
  disabled?: boolean
  onPress: () => void
}

export const ButtonWithHideKeyboard = (props: Props) => (
  <Button
    loading={props.loading ?? false}
    mode={props.mode ?? 'contained'}
    disabled={props.disabled ?? false}
    onPress={() => {
      hideKeyboard()
      props.onPress()
    }}
  >
    {props.text}
  </Button>
)

export default ButtonWithHideKeyboard
