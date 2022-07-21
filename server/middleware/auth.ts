import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../global";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  // In large project, these should probably be stored in one place I think...
  interface DecodedToken {
    userId: string;
  }
  console.log('in auth')
  console.log(req.headers)
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.locals.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecret as string) as DecodedToken;
  } catch (err) {
    res.locals.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    res.locals.isAuth = false;
    return next();
  }

  res.locals.isAuth = true;
  res.locals.userId = decodedToken.userId;
  return next();
}

export {
  authentication,
}
