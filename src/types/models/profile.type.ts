import { Types } from "mongoose";
import { IUserModel } from "./user.type";

export interface IProfile {
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string;
  gender?: "male" | "female" | "other";
  bio?: string | null;
  user: Types.ObjectId | IUserModel;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileMethods {
  updateProfile(data: ISaveProfile): Promise<void>
}

export interface ISaveProfile {
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string;
  gender?: "male" | "female" | "other";
  bio?: string | null;
}

export interface IProfileSignature {
  timestamp: number;
  signature: string;
  folder: string;
  api_key: string;
  cloud_name: string;
}
