import { Model, Schema, model } from "mongoose";
import { IProfile, IProfileMethods, ISaveProfile } from "../types/models/profile.type";

const profileSchema = new Schema<IProfile, Model<IProfile>, IProfileMethods>({
  firstName: {
    type: String,
    default: null,
    trim: true,
    maxlength: [255, "First name can't be more than 255 characters long"]
  },
  lastName: {
    type: String,
    default: null,
    trim: true,
    maxlength: [255, "Last name can't be more than 255 characters long"]
  },
  avatar: {
    type: String,
    trim: true,
    default: "https://www.freepik.com/free-photos-vectors/default-user"
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  bio: {
    type: String,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    unique: true // enforce one to one relationship
  }

},
  {
    timestamps: true
  })

profileSchema.methods.updateProfile = async function ({
  firstName,
  lastName,
  avatar,
  gender,
  bio
}: ISaveProfile) {
  this.firstName = firstName || this.firstName
  this.lastName = lastName || this.lastName
  this.avatar = avatar || this.avatar
  this.gender = gender || this.gender
  this.bio = bio || this.bio
  await this.save()
}

const ProfileModel = model<IProfile>("Profile", profileSchema)

export default ProfileModel
