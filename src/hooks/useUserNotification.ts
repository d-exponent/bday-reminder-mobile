import {
  UserNotificationContext,
  type UserNotificationContextValue
} from 'context/UserNotificationContext'
import React from 'react'

const useUserNotification = () =>
  React.useContext(UserNotificationContext) as UserNotificationContextValue

export default useUserNotification
