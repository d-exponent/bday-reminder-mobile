import React from 'react'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import BirthdayCard from './BirthdayCard'
import { type IBirthday } from './types'
import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { View } from 'react-native'

const BirthdaysList = () => {
  const [savedBirthdays, setSavedBirthdays] = React.useState<IBirthday[] | null>(null)
  const axiosPrivate = useAxiosPrivate()

  React.useEffect(() => {
    const fetchSavedBirthdays = async () => {
      try {
        const response = await axiosPrivate({
          url: '/users/me/birthdays'
        })
        setSavedBirthdays(response.data.data)
      } catch (e) {}
    }

    void fetchSavedBirthdays()
  }, [])

  return (
    <View>
      {savedBirthdays?.map(savedBirtday => (
        <BirthdayCard key={nanoid()} {...savedBirtday} />
      ))}
    </View>
  )
}

export default BirthdaysList
