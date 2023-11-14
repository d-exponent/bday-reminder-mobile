import React, { createContext, useState } from 'react'
import { Portal, Snackbar } from 'react-native-paper'
import {
  type IReactChildren,
  type IUserNotificationValue
} from '../../@types.birthday'

const UserNotificationContext = createContext<IUserNotificationValue | null>(null)

const UserNotificationContextProvider = (props: IReactChildren) => {
  const [snakcBarVisible, setSnackBarVisible] = useState(false)
  const [snackbarMessage, setSnackBarMessage] = useState('')

  const hideSnackBar = () => setSnackBarVisible(false)

  const showNotification = (message: string) => {
    setSnackBarMessage(message)
    setSnackBarVisible(true)
  }

  return (
    <UserNotificationContext.Provider value={{ showNotification }}>
      <>
        {props.children}
        <Portal>
          <Snackbar
            visible={snakcBarVisible}
            onDismiss={hideSnackBar}
            action={{
              label: 'Hide',
              onPress: hideSnackBar
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </Portal>
      </>
    </UserNotificationContext.Provider>
  )
}

export {
  UserNotificationContextProvider as default,
  UserNotificationContext,
  type IUserNotificationValue
}
