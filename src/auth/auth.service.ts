import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(dto: AuthRegisterDto) {
    const { email, name, password } = dto;
    const isExist = await this.userRepository.findOne({
      where: {
        email: email
      }
    })

    if (isExist) throw new BadRequestException();

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    return await this.userRepository.save(user);
  }

  async authenticate({ email, password }: AuthLoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) throw new NotFoundException();

    if (!user.verifyPassword(password)) {
      throw new NotFoundException();
    }

    return {
      token: this.generateJWT(user)
    }
  }

  generateJWT(user: User) {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }
}
