import React from 'react'
import {
  UserNotificationContext,
  type IUserNotificationValue
} from 'context/UserNotificationContext'

const useUserNotification = () =>
  React.useContext(UserNotificationContext) as IUserNotificationValue

export default useUserNotification
