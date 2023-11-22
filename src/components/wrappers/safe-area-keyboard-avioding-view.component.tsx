import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import SafeAreaBox from 'components/SafeAreaBox'
import { type ReactChildrenProp } from '../../../@types.birthday'

const KeyBoardAviodingViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
`

const BEHAVIOUR = Platform.OS === 'ios' ? 'padding' : 'height'

export const SafeAreaKeyBoardAviodingView = (props: ReactChildrenProp) => {
  return (
    <SafeAreaBox>
      <KeyBoardAviodingViewContainer behavior={BEHAVIOUR}>
        {props.children}
      </KeyBoardAviodingViewContainer>
    </SafeAreaBox>
  )
}
