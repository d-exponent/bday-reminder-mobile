import { ButtonWithHideKeyboard } from 'components/helpers/button-with-hide-keyboard.component'
import styled from 'styled-components/native'
export const Screen = styled.View`
  flex: 1;
  padding-left: ${props => props.theme.space[2]};
  padding-right: ${props => props.theme.space[2]};
  justify-content: center;
`

export const WelcomeHeader = styled.Text`
  font-size: 40px;
  margin-bottom: ${props => props.theme.space[5]};
  font-weight: ${props => props.theme.fontWeights.bold};
  text-align: center;
`

export const InputWrapper = styled.View`
  margin-bottom: ${props => props.theme.space[3]};
`

export const GotoOtherFormText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.colors.brand.primary};
  text-decoration: underline;
`

export const SquareButton = styled(ButtonWithHideKeyboard)`
  border-radius: 0;
`
