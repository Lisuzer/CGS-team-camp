import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { IUser } from '../types/user.type';
import MailerService from '../services/mailer.service';

class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    res.send(user);
  }

  async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.delete(id);
    res.send(user);
  }

  async changePassword(req: Request, res: Response) {
    const user = req.user as IUser;
    const passwords = req.body;
    await this.userService.changePassword(user.id, passwords);
    res.send({ message: 'Password changed' });
  }

  async signupConfirm(req: Request, res: Response) {
    const { id } = req.body;
    await this.userService.verifyUser(id);
    res.send({ message: 'User verified' });
  }

  async signup(req: Request, res: Response) {
    const { email, password } = req.body;
    await this.userService.sendSignupConfirm(email, password);
    res.send({ message: 'Confirmation link sended on email' });
  }

  async sendResetConfirm(req: Request, res: Response) {
    const { email } = req.body;
    await this.userService.sendResetConfirm(email);
    res.send({ message: 'Confirmation link sended on email' });
  }

  async resetPassword(req: Request, res: Response) {
    const { password, id } = req.body;
    await this.userService.setNewPassword(id, password);
    res.send({ message: 'Password changed' });
  }

  async login(req: Request) {
    const user = await this.userService.validateUser(req.body);
    return { message: user, tokenPayload: { id: user.id, email: user.email } };
  }

  async currentUser(req: Request, res: Response) {
    const user = req.user as IUser;
    res.send(user);
  }

  async currentUserTodos(req: Request, res: Response) {
    const user = req.user as IUser;
    const userTodos = await this.userService.userTodos(user.id);
    res.send(userTodos?.todos || []);
  }
}

const userController = new UserController(new UserService(new MailerService()));
export default userController;
