import cloudinary from "../config/cloudinary";
import { IProfileSignature } from "../types/models/profile.type";

export const generateSignature = async (): Promise<IProfileSignature> => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'user_profile'
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder
  }, process.env.CLOUD_API_SECRET as string);
  return {
    timestamp,
    signature,
    folder,
    api_key: process.env.CLOUD_API_KEY as string,
    cloud_name: process.env.CLOUD_NAME as string
  }
}

export const getProfileImageUrl = async (publicId: string) => {
  try {
    const imageUrl = cloudinary.url(publicId)
    return imageUrl
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message)
  }
}

export const getAllImages = async () => {
  try {
    const images = await cloudinary.search
      .expression('folder:user_profile')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();
    return images;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message);
  }
}

export const deleteImage = async (publicId: string) => {
  try {
    const image = await cloudinary.search
      .expression(`public_id:${publicId}`)
      .execute();
    if (!image.resources.length) {
      throw new Error("Image not found");
    }
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message);
  }
}



