import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "Файл не знайдено" }, { status: 400 });
    }

    // Перевірка розміру для Vercel (ліміт 4.5MB для Hobby плану)
    if (file.size > 4500000) {
      return NextResponse.json({ error: "Файл занадто великий для сервера" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Завантажуємо в Cloudinary через проміс
    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'avatars',
          // Можна додати автоматичну обрізку до квадрата для аватара:
          transformation: [{ width: 200, height: 200, crop: 'fill' }] 
        }, 
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message || "Помилка сервера" }, { status: 500 });
  }
}