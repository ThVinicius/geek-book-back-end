import { AuthType } from '../../auth/enums/auth-type.enum';

export class ICreateUserDto {
  email: string;
  nickname: string;
  avatar?: string;
  authType: AuthType;
  password: string;
  confirmPassword: string;

  constructor(
    email: string,
    nickname: string,
    password: string,
    confirmPassword: string,
    authType = AuthType.EMAIL,
    avatar?: string,
  ) {
    this.email = email;
    this.nickname = nickname;
    this.avatar = avatar;
    this.authType = authType;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
