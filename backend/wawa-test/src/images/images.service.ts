import { Injectable } from '@nestjs/common';
import { error } from 'console';
import cloudinary from 'src/config/cloudinary.config';

@Injectable()
export class ImagesService {
  async uploadImage(file: any): Promise<string> {
    const { createReadStream, filename } = file;
    const stream = createReadStream();

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: filename,
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url);
        },
      );
      stream.pipe(uploadStream);
    });
  }
}
