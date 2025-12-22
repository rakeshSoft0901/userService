import { Model, HydratedDocument, Types } from "mongoose";

import { IProfile, IProfileMethods } from "./profile.type";

export interface IUser {
  email: string;
  password: string;
  loginOtp?: string | null;
  loginOtpExpiryAt?: Date | null;
  isActive: boolean;
  lastPasswordChangeAt?: Date | null;
  profile?: Types.ObjectId | HydratedDocument<IProfile, IProfileMethods>;
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
