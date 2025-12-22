import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { expiryTime, generateOtp } from "../utils/genrateOtp";
import UserModel from "../models/user.model";
import { checkFieldPresent } from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    checkFieldPresent(email, password)

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    const existingUser = await UserModel.checkUserExist(email)
    if (existingUser) {
      throw new Error("User already exist")
    }

    const otp = generateOtp() // Once email is configured, send the OTP in the email rather than in the response.

    const newUser = await UserModel.create({
      email,
      password,
      loginOtp: otp,
      loginOtpExpiryAt: expiryTime()
    })

    res.status(200).json({ message: "User created successfully", user: newUser, otp })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({
      message
    })
  }
}

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      throw new Error("Email and Otp are required")
    }

    const user = await UserModel.checkUserExist(email)

    if (user.isActive) {
      throw new Error("User is already active")
    }

    if (!user.loginOtp || !user.loginOtpExpiryAt) {
      throw new Error("OTP not generated or already used")
    }

    if (user.loginOtp !== otp) {
      throw new Error("Invalid OTP")
    }

    if (user.loginOtpExpiryAt && user.loginOtpExpiryAt < new Date()) {
      throw new Error("OTP expired")
    }

    user.handleUserActive()
    await user.save()

    res.status(200).json({ message: "OTP verified successfully", user })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({
      message
    })
  }
}

export const reSendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    if (!email) {
      throw new Error("Email is required")
    }
    const user = await UserModel.checkUserExist(email)
    if (user.isActive) {
      throw new Error("User is already active")
    }
    const otp = generateOtp()

    user.loginOtp = otp
    user.loginOtpExpiryAt = expiryTime()
    await user.save()

    res.status(200).json({ message: "OTP sent successfully", otp })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({
      message
    })
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    checkFieldPresent(email, password)
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isPasswordMatched) {
      throw new Error("Invalid credentials")
    }

    if (!user.isActive) {
      throw new Error("User is not active")
    }

    res.status(200).json({ message: "User signed in successfully" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({
      message
    })
  }
}
