import { createContext } from 'react'

export type Session = {
  jwt: string,
  roomName: string,
  displayName: string
}

export type SessionCtx = {
  session?: Session,
  setSession(session: Session): void;
}

export const SessionContext = createContext<SessionCtx>({
  session: {
    jwt: '',
    roomName: '',
    displayName: ''
  },
  setSession: () => {}
})