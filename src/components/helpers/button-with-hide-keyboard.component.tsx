import { hideKeyboard } from 'helpers/utils'
import React from 'react'
import { Button } from 'react-native-paper'

type Mode = 'text' | 'contained' | 'outlined' | 'elevated' | 'contained-tonal' | undefined

interface Props {
  text: string
  loading?: boolean
  mode?: Mode
  disabled?: boolean
  onPress: () => void
}

export const ButtonWithHideKeyboard = ({ loading = false, mode = 'contained', disabled = false, ...props }: Props) => (
  <Button
    loading={loading}
    mode={mode}
    disabled={disabled}
    onPress={() => {
      hideKeyboard()
      props.onPress()
    }}
  >
    {props.text}
  </Button>
)

export default ButtonWithHideKeyboard
