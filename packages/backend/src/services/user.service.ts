import * as bcrypt from 'bcryptjs';
import { DeepPartial } from 'typeorm';
import MailerService from './mailer.service';
import { IUserAuth, IUserCreate } from '../types/user.type';
import { User } from '../entities/user.entity';
import { FRONTEND_PAGES } from '../consts';
import { getJwtBody } from '../middleware/auth.middleware';

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export default class UserService {
  constructor(private mailerService: MailerService) {}

  async findlAll() {
    const users = await User.find();
    return users;
  }

  async findById(id: string) {
    const user = await User.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOneBy({ email });
    return user;
  }

  async create(user: IUserCreate) {
    const newUser = await User.save(user as DeepPartial<User>);
    return newUser;
  }

  async findByWithPassword(field: string, value: string) {
    const user = await User.findOne({
      where: { [field]: value },
      select: ['id', 'email', 'password']
    });
    return user;
  }

  async changePassword(id: string, passwords: IChangePassword) {
    const { oldPassword, newPassword } = passwords;
    const user = await this.findByWithPassword('id', id);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const hashedPassword = await this.hashPassword(newPassword);
      await User.update(id, { password: hashedPassword });
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async setNewPassword(id: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await User.update(id, { password: hashedPassword });
  }

  async delete(id: string) {
    const userToDelete = await User.findOneBy({ id });
    await User.delete(id);
    return userToDelete;
  }

  async verifyUser(id: string) {
    const existingUser = await User.findOneBy({ id });
    if (!existingUser) {
      throw new Error('User with this id does not exist');
    }
    await User.update(id, { isVerified: true });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validateUser(dto: IUserAuth) {
    const { email, password } = dto;
    const user = await this.findByWithPassword('email', email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: pass, ...payload } = user;
      return { ...payload };
    }
    throw new Error('Invalid credentials');
  }

  async sendSignupConfirm(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.create({ email, password: hashedPassword });
    const token = getJwtBody({ id: user.id, email });
    const link = `${FRONTEND_PAGES.SUCCESS_SIGNUP}?token=${token.split(' ')[1]}`;
    await this.mailerService.confirmEmail(email, link);
  }

  async sendResetConfirm(email: string) {
    const user = await this.findByEmail(email);
    const token = getJwtBody({ id: user?.id, email });
    const link = `${FRONTEND_PAGES.SUCCESS_RESET}?token=${token.split(' ')[1]}`;
    await this.mailerService.resetPassword(email, link);
  }

  async userTodos(id: string) {
    const user = await User.findOne({
      where: { id },
      relations: ['todos'],
      order: { todos: { createdAt: 'DESC' } }
    });
    return user;
  }
}
