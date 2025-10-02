import { NextRequest, NextResponse } from 'next/server';
import { fileUploadService } from '@/lib/fileUpload';
import { withAuth } from '@/middleware/auth';

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const subfolder = formData.get('subfolder') as string || 'templates';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = fileUploadService.validateFile(file, {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
        'application/json',
        'text/plain'
      ]
    });

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Upload file
    const uploadedFile = await fileUploadService.uploadFile(file, subfolder);

    return NextResponse.json({
      success: true,
      file: uploadedFile
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
});
