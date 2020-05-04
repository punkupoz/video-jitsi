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
  const { session } = React.useContext(SessionContext)
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
  }, process.env.JITSI_SUB)

  useEffect(() => {
    if (jitsi) {
      jitsi.addListener('videoConferenceJoined', () => {
      })
    }
    return () => jitsi && jitsi.dispose()
  }, [jitsi, session.displayName])

  return <div id={parentNode} style={{ height: '100vh', width: '100%'}}/>
}

export default ConferenceScreen