import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import bcrypt from 'bcrypt'

import UserDao from '@daos/User/UserDao';
import { paramMissingError } from '@shared/constants';
import jwt from 'jsonwebtoken'

// Init shared
const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

// router.get('/all', async (req: Request, res: Response) => {
//   const userDao = new UserDao(req.app.locals.db);
//   const users = await userDao.getAll();
//   return res.status(OK).json({users});
// });

/******************************************************************************
 *                      Sign user - "POST /api/users/login"
 ******************************************************************************/

router.post('/login', async (req: Request, res: Response) => {
  const userDao = new UserDao(req.app.locals.db);
  const user = await userDao.getOne(req.body.user_name).catch(e => {
    console.log(e)
  });
  
  if (!user) {
    return res.status(BAD_REQUEST).json({message: "User not found"})
  }

  const valid = await bcrypt.compare(req.body.password, user.password).catch(e => {
    console.log(e)
  })

  if (!valid) {
    return res.status(BAD_REQUEST).json({message: "User not found"})
  }

  const token = jwt.sign({
    user_name: user.user_name,
    sub: process.env.JITSI_SUB,
    room: '*',
    aud: process.env.JITSI_AUD,
    iss: process.env.JITSI_AUD
  }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  return res.status(OK).json({accessToken: token});
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
  const userDao = new UserDao(req.app.locals.db);
  const { user_name, password, activation_key } = req.body;
  if (!activation_key || activation_key !== process.env.ACTIVATION_KEY) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  if (!user_name || !password) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await userDao.add({user_name, password: hashedPassword, id: 0});
  return res.status(CREATED).end();
});


// /******************************************************************************
//  *                       Update - "PUT /api/users/update"
//  ******************************************************************************/

// router.put('/update', async (req: Request, res: Response) => {
//   const { user } = req.body;
//   if (!user) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError,
//     });
//   }
//   user.id = Number(user.id);
//   await userDao.update(user);
//   return res.status(OK).end();
// });


// /******************************************************************************
//  *                    Delete - "DELETE /api/users/delete/:id"
//  ******************************************************************************/

// router.delete('/delete/:id', async (req: Request, res: Response) => {
//   const { id } = req.params as ParamsDictionary;
//   await userDao.delete(Number(id));
//   return res.status(OK).end();
// });


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
