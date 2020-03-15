import React, { useState, useEffect } from 'react'
import {
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

// Remember that the hook can only be used within a React functional component
function ReCaptchaComponent(props) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isRobot, setRobotStatus] = useState('')

  useEffect(() => {
    executeRecaptcha().then(res => setRobotStatus(res))
  }, [])

  return (
    <>
      {isRobot && props.children}
    </>
  )
}

export default ReCaptchaComponent
