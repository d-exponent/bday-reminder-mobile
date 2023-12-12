import React from 'react'
import styled from 'styled-components/native'

import { type StyledWithThemeProp } from '../../../@types.birthday'

const SmallRedText = styled.Text<StyledWithThemeProp>`
  font-size: ${props => props.theme.fontSizes.formWarn};
  color: ${props => props.theme.colors.text.error};
`

export const SmallErrorText = (props: { text: string | undefined }) => (
  <SmallRedText>{props.text}</SmallRedText>
)
