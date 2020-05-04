import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
import { SessionContext } from '../../context/session'
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core'
import fetch from 'isomorphic-fetch'

interface Values {
  userName: string;
  password: string;
  roomName: string;
  displayName: string;
}

const LoginScreen = () => {
  const { setSession } = React.useContext(SessionContext)
  const history = useHistory()
  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
        roomName: '',
        displayName: ''
      }}
      validate={values => {
        const errors: Partial<Values> = {};
        if (!values.userName) errors.userName = "required"
        if (!values.password) errors.password = "required"
        return errors;
      }}
      onSubmit={async (values: Values) => {
        const result = await fetch(`${process.env.API_ENDPOINT}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_name: values.userName,
            password: values.password
          })
        }).then(res => res.json())
        .catch(e => {
          console.log(e)
        })
        if (result) {
          setSession({
            jwt: result.accessToken,
            roomName: values.roomName,
            displayName: values.displayName,
          })
          history.push('/call')
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={3} justify='center'>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                      Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="userName"
                    type="userName"
                    required
                    label="User name"
                    fullWidth
                    variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    required
                    name="password"
                    type="password"
                    label="Password"
                    fullWidth
                    variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="displayName"
                    label="Display Name"
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    component={TextField}
                    name="roomName"
                    label="Room Name"
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="subject"
                    label="Subject"
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  {isSubmitting ? <LinearProgress /> : <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default LoginScreen