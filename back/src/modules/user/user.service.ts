import { DeleteUser } from './dto/delete-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroesService {
  FindOne(id: HeroById): Observable<any>;
}

interface HeroById {
  id: number;
}

interface Hero {
  data: string;
}

@Injectable()
export class UserService implements OnModuleInit {
  private heroesService: HeroesService;

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  constructor(
    private readonly prisma: PrismaService,
    @Inject('HERO_PACKAGE') private client: ClientGrpc,
  ) {}

  async createUser(createUserDto: CreateUserDto, s3File: any) {
    const emailArray = await this.prisma.user.findMany({
      select: { email: true },
    });

    if (
      emailArray.filter((data) => data.email === createUserDto.email).length > 0
    ) {
      throw Error('Invalid email');
    }
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT),
    );
    createUserDto.password = hashPassword;
    if (s3File !== undefined) {
      console.log(typeof s3File.Location);

      createUserDto.profile_image = s3File.Location;
    }

    return await this.prisma.user.create({ data: createUserDto });
  }

  async deleteUser(deleteUser: number): Promise<Observable<string>> {
    // console.log(deleteUser);

    return this.heroesService.FindOne({ id: deleteUser });
  }

  async getInfoUser(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        surname: true,
        profile_image: true,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }
}
