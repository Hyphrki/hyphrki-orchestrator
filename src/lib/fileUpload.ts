import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export interface UploadedFile {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  url: string;
}

export class FileUploadService {
  private uploadDir: string;
  private baseUrl: string;

  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR || './public/uploads';
    this.baseUrl = process.env.BASE_URL || 'https://orchestrator.hyphrki.com';
  }

  async uploadFile(file: File, subfolder: string = 'templates'): Promise<UploadedFile> {
    try {
      // Create directory if it doesn't exist
      const uploadPath = join(this.uploadDir, subfolder);
      await mkdir(uploadPath, { recursive: true });

      // Generate unique filename
      const fileExtension = file.name.split('.').pop() || '';
      const uniqueFilename = `${randomUUID()}.${fileExtension}`;
      const filePath = join(uploadPath, uniqueFilename);

      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write file to disk
      await writeFile(filePath, buffer);

      // Generate public URL
      const url = `${this.baseUrl}/uploads/${subfolder}/${uniqueFilename}`;

      return {
        filename: uniqueFilename,
        originalName: file.name,
        path: filePath,
        size: buffer.length,
        mimeType: file.type,
        url
      };
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error('Failed to upload file');
    }
  }

  async uploadMultipleFiles(files: File[], subfolder: string = 'templates'): Promise<UploadedFile[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, subfolder));
    return Promise.all(uploadPromises);
  }

  validateFile(file: File, options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {}): { valid: boolean; error?: string } {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'] } = options;

    if (file.size > maxSize) {
      return { valid: false, error: `File size exceeds ${maxSize / 1024 / 1024}MB limit` };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: `File type ${file.type} is not allowed` };
    }

    return { valid: true };
  }

  getFileUrl(filename: string, subfolder: string = 'templates'): string {
    return `${this.baseUrl}/uploads/${subfolder}/${filename}`;
  }
}

export const fileUploadService = new FileUploadService();
