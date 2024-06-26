import React from 'react'
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { type ReactChildrenProp } from '../../../@types.birthday'

interface SafeBoxStyledProps {
  paddingTop: number
  paddingLeft: number
  paddingRight: number
  paddingBottom: number
}

const SafeBox = styled.View<SafeBoxStyledProps>`
  flex: 1;
  padding-top: ${props => props.paddingTop}px;
  padding-bottom: ${props => props.paddingBottom}px;
  padding-left: ${props => props.paddingLeft}px;
  padding-right: ${props => props.paddingRight}px;
`

interface SaveAreaBoxProps extends ReactChildrenProp {
  disableSafeArea?: boolean
}

const SafeAreaBox = ({ disableSafeArea = false, ...props }: SaveAreaBoxProps) => {
  const safeAreaInsets = useSafeAreaInsets()

  const insets = React.useMemo((): EdgeInsets => {
    const insetOnDisableSafeAreaProp = (inset: number) => (disableSafeArea ? 0 : inset)

    return {
      top: insetOnDisableSafeAreaProp(safeAreaInsets.top),
      bottom: insetOnDisableSafeAreaProp(safeAreaInsets.bottom),
      left: insetOnDisableSafeAreaProp(safeAreaInsets.left),
      right: insetOnDisableSafeAreaProp(safeAreaInsets.right)
    }
  }, [disableSafeArea, safeAreaInsets])

  return (
    <SafeBox
      paddingLeft={insets.left}
      paddingRight={insets.right}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
    >
      {props.children}
    </SafeBox>
  )
}

export default SafeAreaBox
