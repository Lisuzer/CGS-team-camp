import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { IAuthPayload } from '../types/user.type';
import { TryCatch } from './try-catch.middleware';
import { User } from '../entities/user.entity';

const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const passportOptionsSignup = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: process.env.JWT_SECRET
};

const passportJwtStrategyLogin = new Strategy(
  passportOptions,
  async ({ id }: IAuthPayload, done: VerifiedCallback) => {
    try {
      const user = await User.findOneBy({ id });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);

const passportJwtStrategySignup = new Strategy(
  passportOptionsSignup,
  async (signupFields: IAuthPayload, done: VerifiedCallback) => {
    done(null, signupFields);
  }
);

function getJwtBody(payload: Object) {
  const token = jwt.sign({ ...payload }, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}

passport.use('jwt-from-login', passportJwtStrategyLogin);
passport.use('jwt-signup', passportJwtStrategySignup);

const authGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  let errorMessage;
  await new Promise((resolve) =>
    passport.authenticate('jwt-from-login', { session: false }, (error: unknown, user: User) => {
      if (error || !user) {
        res.status(401);
        errorMessage = 'Unauthorized';
      }
      req.user = user;
      return resolve(user);
    })(req, res, next)
  );
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  return next();
});

const optionalAuthGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  await new Promise((resolve) =>
    passport.authenticate('jwt-from-login', { session: false }, (error: unknown, user: User) => {
      if (error) {
        res.status(401);
        throw new Error('Unauthorized');
      }
      req.user = user || null;
      resolve(1);
    })(req, res, next)
  );
  next();
});

const authGetUserFromToken = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  await new Promise((resolve) =>
    passport.authenticate(
      'jwt-signup',
      { session: false },
      (err: unknown, signupFields: IAuthPayload) => {
        const { id, email } = signupFields || null;
        req.body = { id, email, ...req.body };
        resolve(1);
      }
    )(req, res, next)
  );
  next();
});

function AddAuthToken(callback: any) {
  return TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { message, tokenPayload } = await callback(req, res, next);
    if (tokenPayload) {
      const token = getJwtBody(tokenPayload);
      res.send({ message, token });
    } else {
      res.status(400).json({ error: message });
    }
  });
}

export { authGetUser, optionalAuthGetUser, authGetUserFromToken, AddAuthToken, getJwtBody };
