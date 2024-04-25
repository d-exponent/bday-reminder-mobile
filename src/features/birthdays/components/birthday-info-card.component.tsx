import { Asset } from 'expo-asset'
import React from 'react'
import { Card, Text } from 'react-native-paper'

import { type BirthdayInfo } from '../types'

const currentYear = new Date().getFullYear()

const getFormattedDate = (month: number, day: number) => new Date(currentYear, month, day).toDateString().slice(0, 10)

export const BirthdayInfoCard = (props: BirthdayInfo) => {
  const uri = Asset.fromModule(require('../../../../assets/default-birthday.jpg')).uri
  // const uri = props?.imageCover ?? Asset.fromModule(require('../../../../assets/default-birthday.jpg')).uri

  return (
    <Card>
      <Card.Cover source={{ uri }} />
      <Card.Title title={props.name} />
      <Card.Content>
        <Text variant="bodyMedium">Date: {getFormattedDate(props.month - 1, props.day)}</Text>
        {props.email != null && <Text variant="bodyMedium">Email {props.email}</Text>}
        {props.phone != null && <Text variant="bodyMedium">Phone Number: {props.phone}</Text>}
        <Text>Created: {new Date(props.created_at).toDateString()}</Text>
      </Card.Content>
    </Card>
  )
}
