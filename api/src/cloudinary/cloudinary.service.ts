import cloudinary from "./config.js";

export class CloudinaryService {

    uploadImage(buffer: Buffer): Promise<string> {

        return new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream({}, (error, result) => {

                if (error) {
                    reject(error)
                    return
                }

                if (!result) {
                    reject(new Error('Upload não retornou resultado'))
                    return
                }

                resolve(result.secure_url)
            })

            uploadStream.end(buffer)
        })
    }
}