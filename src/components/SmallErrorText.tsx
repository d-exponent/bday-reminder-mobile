import React from 'react'
import styled from 'styled-components/native'

const SmallRedText = styled.Text`
  font-size: ${props => props.theme.fontSizes.caption};
`

const SmallErrorText = (props: { text: string | undefined }) => (
  <SmallRedText>{props.text}</SmallRedText>
)

export default SmallErrorText
