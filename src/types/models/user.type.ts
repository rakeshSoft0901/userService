import { Model, HydratedDocument } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  loginOtp?: string | null;
  loginOtpExpiryAt?: Date | null;
  isActive: boolean;
  lastPasswordChangeAt?: Date | null;
}

export interface IUserMethods {
  handleUserActive(): void;
  handleUserInactive(): void;
  handleUserOtpExpired(): void;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  checkUserExist(email: string): Promise<HydratedDocument<IUser, IUserMethods>>
}


// export type IUserModel = Model<IUser, {}, IUserMethods>
