import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ToolService {
  constructor(private prisma: PrismaService) {}

  async create(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({
      data: createToolDto,
    });
  }

  async findAll() {
    return this.prisma.tool.findMany();
  }

  async update(id: number, updateToolDto: UpdateToolDto) {
    return this.prisma.tool.update({
      where: { id },
      data: updateToolDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tool.delete({
      where: { id },
    });
  }
}
