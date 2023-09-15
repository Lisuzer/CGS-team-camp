import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { EntityTarget, ObjectLiteral, getRepository } from 'typeorm';
import { TryCatch } from '../middleware/try-catch.middleware';
import { User } from '../entities/user.entity';

class Validator {
  isBody<T>(schema: ObjectSchema<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.body);
        next();
      } catch (error) {
        return res.status(400).json({ error: error instanceof Error ? error.message : error });
      }
    };
  }

  isExist(entity: EntityTarget<ObjectLiteral>) {
    return TryCatch(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const todo = await getRepository(entity).findOneBy({ id });
      if (!todo) {
        throw new Error('Entity with provided id does not exist');
      }
      next();
    });
  }

  isExistEmail = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new Error('User with this email does not exist');
    }
    next();
  });

  isNotExistEmail = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOneBy({ email });
    if (user) {
      throw new Error('User with this email already exist');
    }
    return next();
  });

  isVerified = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const fullInfoUser = await User.findOneBy({ email });
    if (fullInfoUser?.isVerified) {
      return next();
    }
    throw new Error('You are not verified');
  });

  isOwner = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (!user) {
      throw new Error('You are not the owner');
    }
    const userWithTodos = await User.findOne({ where: { id: user.id }, relations: ['todos'] });
    if (userWithTodos?.todos.length) {
      if (userWithTodos.todos.some((todo) => todo.id === req.params.id)) {
        return next();
      }
    }
    throw new Error('You are not the owner');
  });
}

const validator = new Validator();
export default validator;
