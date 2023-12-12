import { nanoid } from 'nanoid'
import React from 'react'
import 'react-native-get-random-values' // POLYFILL TO ALLOW NANOID ON REACT NATIVE

import { type BirthdayInfo } from '../types'
import { BirthdayInfoCard } from './birthday-info-card.component'

interface Props {
  birthdaysInfo: BirthdayInfo[]
}

export const BirthdaysInfoList = (props: Props) => {
  return (
    <>
      {props.birthdaysInfo.map(birthdayInfo => (
        <BirthdayInfoCard key={nanoid()} {...birthdayInfo} />
      ))}
    </>
  )
}
