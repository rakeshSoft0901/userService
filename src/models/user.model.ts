import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import isEmail from "validator/lib/isEmail";
import { IUser, IUserMethods, IUserModel } from "../types/models/user.type";
import ProfileModel from "./profile.model";

// Schema < DocType,ModelType,InstanceMethods >
const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: "Please provide a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true
  },
  loginOtp: {
    type: String,
    default: null,
    minlength: [6, "OTP must be at least 6 digits long"],
    maxlength: [6, "OTP must be at most 6 digits long"]
  },
  loginOtpExpiryAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  },
  lastPasswordChangeAt: {
    type: Date,
    default: null
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    unique: true // enforce one to one relationship
  }
},
  {
    timestamps: true
  })

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
    this.lastPasswordChangeAt = new Date()
  }
})

userSchema.post("save", async function () {
  try {
    const existingProfile = await ProfileModel.findOne({ user: this._id })
    if (!existingProfile) {
      const profile = await ProfileModel.create({ user: this._id })
      this.profile = profile._id
      await this.save()
    }
  } catch (error) {
    await this.deleteOne() // delete the user if profile creation fails
    throw error
  }
})

userSchema.statics.checkUserExist = async function (email: string) {
  return await this.findOne({ email })
}

userSchema.methods.handleUserOtpExpired = function () {
  this.loginOtp = null
  this.loginOtpExpiryAt = null
}

userSchema.methods.handleUserActive = function () {
  this.isActive = true
  this.handleUserOtpExpired()
}

userSchema.methods.handleUserInactive = function () {
  this.isActive = false
}

const UserModel: IUserModel = model<IUser, IUserModel>("User", userSchema)

export default UserModel
