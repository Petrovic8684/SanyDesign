import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma.service';
import axios from 'axios';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  private async verifyCaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: secret || '',
        response: token,
      }),
    );

    return response.data.success;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { captcha, ...messageData } = createMessageDto;

    const isValid = await this.verifyCaptcha(captcha);
    if (!isValid) {
      throw new BadRequestException('Invalid captcha token');
    }

    return this.prisma.message.create({
      data: messageData,
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: number) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
