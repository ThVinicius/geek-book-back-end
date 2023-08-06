import { AuthType } from 'src/domain/auth/enums/auth-type.enum';

export interface IUser {
  id: number;
  nickname: string;
  avatar?: string;
  email: string;
  password: string | null;
  authType: AuthType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  // session       Session?
  // userHistory   UserCollection[]
  // share         Share?
  // Ranking       Ranking[]
}
