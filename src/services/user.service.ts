import UserModel from "../models/user.model";

export const checkFieldPresent = (email: string, password: string) => {
  if (!email && !password) {
    throw new Error("Email and password are required")
  }

}