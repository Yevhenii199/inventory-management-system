import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: "Файл не знайдено" }, { status: 400 });
  }

  // Конвертуємо файл у буфер для відправки
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Завантажуємо в Cloudinary
  const uploadResponse: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'avatars' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });

  return NextResponse.json({ url: uploadResponse.secure_url });
}