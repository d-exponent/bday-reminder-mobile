import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { LoginSignUp } from '../components/LoginSignUp'
import { SubmitAccessCode } from '../components/forms/SubmitAccessCode'

// background-color: ${props => props.theme.colors.ui.primary};
const Form = styled.View`
  
`

const UserAuth = () => {
  const [showSubmitAccessCode, setShowSubmitAccessCode] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [exitSubmitCodeForm, setExitSubmitCodeForm] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof userEmail === 'string' && userEmail.length > 0) {
      setShowSubmitAccessCode(true)
    }
  }, [userEmail])

  useEffect(() => {
    // Reset all the states
    if (exitSubmitCodeForm === true) {
      userEmail !== null && setUserEmail(null)
      showSubmitAccessCode && setShowSubmitAccessCode(false)
      setExitSubmitCodeForm(null)
    }
  }, [exitSubmitCodeForm, userEmail, showSubmitAccessCode])

  return (
    <Form>
      {!showSubmitAccessCode && <LoginSignUp setEmail={setUserEmail} />}

      {showSubmitAccessCode && (
        <SubmitAccessCode
          userEmail={userEmail}
          exit={() => setExitSubmitCodeForm(true)}
        />
      )}
    </Form>
  )
}

export default UserAuth
