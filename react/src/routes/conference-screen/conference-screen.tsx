import React, { useEffect } from 'react'
import { useJitsi } from 'react-jutsu'
import { SessionContext } from '../../context/session'
import { useHistory } from 'react-router-dom'

// const Conference = () => {
//   if (!session) return <div></div>

//   return (
//     <ConferenceScreen session={session}/>
//   )
// }

const ConferenceScreen = (/* {session}: {session: Session} */) => {
  const { session, setSession } = React.useContext(SessionContext)
  const history = useHistory()

  const parentNode = 'jitsi-container'

  useEffect(() => {
    if (!session || (session && !session.jwt)) {
      history.push('/')
    }
  })

  const jitsi = useJitsi({ 
    roomName: session.roomName,
    parentNode,
    jwt: session.jwt,
    userInfo: {
      displayName: session.displayName,
    },
    configOverwrite: {
      disableDeepLinking: true,
    },
    width: '100%',
    height: '100%'
  }, process.env.REACT_APP_JITSI_SUB)

  useEffect(() => {
    let timeout
    if (jitsi) {
      jitsi.addListener('videoConferenceLeft', () => {
        timeout = setTimeout(() => {
          setSession({
            jwt: '',
            roomName: '',
            displayName: ''
          })
          localStorage.clear()
          history.push('/')
        }, 1000)
      })
    }
    return () => {
      clearTimeout(timeout)
      jitsi && jitsi.dispose()
    }
  }, [jitsi, session.displayName, setSession, history])

  return <div id={parentNode} style={{ height: '100vh', width: '100%'}}/>
}

export default ConferenceScreen