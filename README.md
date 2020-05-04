### Demo app
Simple demo React wrapper for Jitsi servers with JWT authentication.
Don't take anything too serious here :)
#### Back end
##### 1. Database initialize

```
sqlite3 ./db/test.sqlite

CREATE TABLE user (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

##### 2. Change env
```
# Environment
NODE_ENV=development
JWT_SECRET=
JITSI_SUB=
JITSI_AUD=

# Server
PORT=3000
HOST=localhost
```
In store this in  `${APP_PATH}/env/${development|prouction|test}.env`, The JWT secret need to be a match with the secret on Jitsi server.
I'm just using secret key (HMAC) to keep this small. Private key JWT using RSA or ECDSA PRs are welcomed.

##### 3. Start dev
```
yarn
yarn dev
```

##### Endpoints
```
/api/users/login
req: {
  user_name: string,
  password: string,
}

res: {
  accessToken: string,
}
```

#### Front end
Add an `.env` file
```
REACT_APP_JITSI_SUB=meet.jit.si <- use your jitsi server.
REACT_APP_API_ENDPOINT=http://localhost:3000 <- back end endpoint
```

### Jitsi server: jitsi.shipcapt.com
Linked problems: https://github.com/jitsi/lib-jitsi-meet/issues/1082
