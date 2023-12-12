import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { BirthdaysInfoList } from '../components/birthday-info-list.component'
import { LoadingBirthdaysInfoSpinnerBox, EmptyBirthdaysInfoBox } from '../components/view-birthday-info-children.components'

import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import SafeAreaBox from 'components/wrappers/safe-area-box.component'
import type {
  BottomTabNavigatorsList as BTNL,
  StackNavigatorsList as SNL
} from 'navigators/types'
import { type BirthdayInfo } from '../types'

const BirthdayBigBox = styled.View`
  flex: 1;
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
      <BirthdayBigBox>
        {isNull && <LoadingBirthdaysInfoSpinnerBox />}
        {!isNull && birthdays.length === 0 && <EmptyBirthdaysInfoBox />}

        {/* TODO: Replace Scroll VIew with FlatList */}
        {!isNull && birthdays.length > 0 && (
          <ScrollView>
            <BirthdaysInfoList birthdaysInfo={birthdays} />
          </ScrollView>
        )}
        <View>
          <Button
            onPress={() => {
              props.navigation.navigate('UploadNewBirthday')
            }}
          >
            Add a new Birthday
          </Button>
        </View>
      </BirthdayBigBox>
    </SafeAreaBox>
  )
}

export default Birthdays
