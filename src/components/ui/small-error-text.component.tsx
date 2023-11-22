import React from 'react'
import styled from 'styled-components/native'

const SmallRedText = styled.Text`
  font-size: ${props => props.theme.fontSizes.caption};
  color: ${props => props.theme.colors.text.error};
`

interface Props {
  text: string | undefined
}

export const SmallErrorText = (props: Props) => (
  <SmallRedText>{props.text}</SmallRedText>
)
