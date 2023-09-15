import HttpService from './htt.service';
import {
  ISignUpServer,
  ILoginData,
  IResetPasswordServer,
  IChangePasswordServer
} from '../modules/auth/types/user.types';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';

class UserService extends HttpService {
  sendSignupEmail(signUpData: ISignUpServer) {
    return this.post({
      url: `${BACKEND_KEYS.USER}/register`,
      data: signUpData
    });
  }

  login(loginData: ILoginData) {
    return this.post({
      url: `${BACKEND_KEYS.USER}/login`,
      data: loginData,
      recieveAuthHeader: true
    });
  }

  regiscterConfirm(token: string) {
    return this.get({
      url: `${BACKEND_KEYS.USER}/register-confirm?token=${token}`
    });
  }

  forgetPassword(email: string) {
    return this.post({
      url: `${BACKEND_KEYS.USER}/reset-password`,
      data: { email }
    });
  }

  resetPassword(data: IResetPasswordServer) {
    const { token, newPassword } = data;
    return this.put({
      url: `${BACKEND_KEYS.USER}/reset-password-confirm?token=${token}`,
      data: { password: newPassword }
    });
  }

  async getUser(token?: string) {
    if (!token) {
      return null;
    }
    const response = await this.get(
      {
        url: `${BACKEND_KEYS.USER}/current`
      },
      true
    );
    return response;
  }

  async changePassword(data: IChangePasswordServer) {
    const response = await this.put(
      {
        url: `${BACKEND_KEYS.USER}/change-password`,
        data
      },
      true
    );
    return response;
  }
}

const userService = new UserService();

export default userService;
