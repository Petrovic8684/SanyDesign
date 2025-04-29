import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma.service';
import * as cloudinary from 'cloudinary';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: {
        orderNo: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  private extractPublicId(url: string): string {
    const regex = /\/image\/upload\/v\d+\/(.*)\./;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error(`Invalid Cloudinary URL: ${url}`);
    }
  }

  private async deleteImagesFromCloudinary(urls: string[]): Promise<void> {
    const deletePromises = urls.map((url) => {
      try {
        const publicId = this.extractPublicId(url);
        return cloudinary.v2.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error extracting public ID:', error);
      }
    });

    await Promise.all(deletePromises);
  }

  async remove(id: number) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
      });

      if (project && project.images && project.images.length > 0) {
        await this.deleteImagesFromCloudinary([project.coverImg]);
        await this.deleteImagesFromCloudinary(project.images);
      }

      return this.prisma.project.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting project.', error);
      throw error;
    }
  }
}
