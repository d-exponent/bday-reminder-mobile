import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import styled from 'styled-components/native'

const ActivityIndicatorWrapper = styled.View`
  flex: 3;
  justify-content: center;
`
const EmptyBirthdayTextWrapper = styled(ActivityIndicatorWrapper)`
  align-items: center;
`

export const LoadingBirthdaysInfoSpinnerBox = () => (
  <ActivityIndicatorWrapper>
    <ActivityIndicator animating={true} size="large" />
  </ActivityIndicatorWrapper>
)

export const EmptyBirthdaysInfoBox = () => (
  <EmptyBirthdayTextWrapper>
    <Text>You have no saved birthdays</Text>
  </EmptyBirthdayTextWrapper>
)
