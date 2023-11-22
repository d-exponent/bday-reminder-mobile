import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import styled from 'styled-components/native'

import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { BirthdaysInfoList } from '../components/birthday-info-list.components'

import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import SafeAreaBox from 'components/wrappers/safe-area-box.component'
import type {
  BottomTabNavigatorsList as BTNL,
  StackNavigatorsList as SNL
} from 'navigators/types'
import { type BirthdayInfo } from '../types'

const BirthdayBigBox = styled.View`
  flex: 3;
`
const ActivityIndicatorWrapper = styled(BirthdayBigBox)`
  justify-content: center;
`

const EmptyBirthdayTextWrapper = styled(ActivityIndicatorWrapper)`
  align-items: center;
`

type Props = BottomTabScreenProps<BTNL & SNL, 'Profile'>

const Birthdays = (props: Props) => {
  const [birthdays, setBirthdays] = React.useState<BirthdayInfo[] | null>(null)
  const axiosPrivate = useAxiosPrivate()

  const fetchBirthdays = async () => {
    try {
      const response = await axiosPrivate({
        url: '/users/me/birthdays'
      })
      setBirthdays(response.data.data)
    } catch (e) {
      setBirthdays([])
    }
  }

  React.useEffect(() => {
    void fetchBirthdays()
  }, [])

  const isNull = birthdays === null
  return (
    <SafeAreaBox>
      {isNull && (
        <BirthdayBigBox>
          <ActivityIndicatorWrapper>
            <ActivityIndicator animating={true} size="large" />
          </ActivityIndicatorWrapper>
          <Button
            onPress={() => {
              props.navigation.navigate('UploadNewBirthday')
            }}
          >
            Add a new Birthday
          </Button>
        </BirthdayBigBox>
      )}

      {!isNull && birthdays.length === 0 && (
        <BirthdayBigBox>
          <EmptyBirthdayTextWrapper>
            <Text>You have no saved birthdays</Text>
          </EmptyBirthdayTextWrapper>
        </BirthdayBigBox>
      )}

      {!isNull && birthdays.length > 0 && (
        <BirthdayBigBox>
          <ScrollView>
            <BirthdaysInfoList birthdaysInfo={birthdays} />
          </ScrollView>
        </BirthdayBigBox>
      )}

      {birthdays !== null && (
        <View>
          <Button
            onPress={() => {
              props.navigation.navigate('UploadNewBirthday')
            }}
          >
            Add a new Birthday
          </Button>
        </View>
      )}
    </SafeAreaBox>
  )
}

export default Birthdays
