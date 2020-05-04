import React from 'react';
import AppRoutes from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { CssBaseline } from '@material-ui/core';
import { SessionContext, Session } from './context/session'

function App() {
  const [session, setSession] = React.useState<Session>({
    jwt: '',
    roomName: '',
    displayName: ''
  })

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Jitsi JWT Wrapper</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Helmet>
        <CssBaseline />
        <SessionContext.Provider value={{session, setSession}}>
          <ThemeProvider theme={theme}>
            <AppRoutes/>
          </ThemeProvider>
        </SessionContext.Provider>
      </HelmetProvider>
    </div>
  );
}

export default App;
