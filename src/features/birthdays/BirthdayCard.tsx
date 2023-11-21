import React from 'react'
import { Card, Text } from 'react-native-paper'

import { type IBirthday } from './types'

const currentYear = new Date().getFullYear()

const BirthdayCard = (props: IBirthday) => {
  const dueDateString = new Date(
    currentYear,
    props.month - 1,
    props.day
  ).toDateString()

  return (
    <Card>
      <Card.Cover source={{ uri: props.imageCover }} />
      <Card.Title title={props.name} />
      <Card.Content>
        <Text variant="bodyMedium">Date: {dueDateString.slice(0, 10)}</Text>
        {props.email != null && (
          <Text variant="bodyMedium">Email {props.email}</Text>
        )}
        {props.phone != null && (
          <Text variant="bodyMedium">Phone Number: {props.phone}</Text>
        )}
        <Text>Created: {new Date(props.created_at).toDateString()}</Text>
      </Card.Content>
    </Card>
  )
}

export default BirthdayCard
