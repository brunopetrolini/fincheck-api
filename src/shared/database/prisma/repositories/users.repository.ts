import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Prisma.UserCreateInput) {
    const defaultCategories = [
      { name: 'Salário', icon: 'travel' },
      { name: 'Freelance', icon: 'freelance' },
      { name: 'Outro', icon: 'other' },
      { name: 'Casa', icon: 'home' },
      { name: 'Alimentação', icon: 'food' },
      { name: 'Educação', icon: 'education' },
      { name: 'Lazer', icon: 'fun' },
      { name: 'Mercado', icon: 'grocery' },
      { name: 'Roupas', icon: 'clothes' },
      { name: 'Transporte', icon: 'transport' },
      { name: 'Vigem', icon: 'travel' },
    ];

    try {
      return await this.prismaService.user.create({
        data: {
          ...user,
          categories: {
            createMany: {
              data: defaultCategories,
              skipDuplicates: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: false,
          updatedAt: false,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`A user with this email already exists.`);
        }
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: false,
        name: true,
        email: true,
        password: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!user) return null;

    return user;
  }
}
