import React from 'react'
import { Portal, Snackbar } from 'react-native-paper'
import { type ReactChildrenProp } from '../../@types.birthday'

interface UserNotificationContextValue {
  showNotification: (msg: string) => void
}

const UserNotificationContext =
  React.createContext<UserNotificationContextValue | null>(null)

const UserNotificationProvider = (props: ReactChildrenProp) => {
  const [snakcBarVisible, setSnackBarVisible] = React.useState(false)
  const [snackbarMessage, setSnackBarMessage] = React.useState('')

  const hideSnackBar = () => setSnackBarVisible(false)

  const showNotification = (message: string) => {
    setSnackBarMessage(message)
    setSnackBarVisible(true)
  }

  return (
    <UserNotificationContext.Provider value={{ showNotification }}>
      <>
        <Portal>
          <Snackbar
            elevation={5}
            visible={snakcBarVisible}
            onDismiss={hideSnackBar}
            action={{
              label: 'Close',
              onPress: hideSnackBar
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </Portal>
        {props.children}
      </>
    </UserNotificationContext.Provider>
  )
}

export {
  UserNotificationContext,
  UserNotificationProvider as default,
  type UserNotificationContextValue
}
