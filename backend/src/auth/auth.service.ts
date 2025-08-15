import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== process.env.USRNM)
      throw new NotFoundException('User not found');

    if (password !== process.env.PASS)
      throw new BadRequestException('Invalid credentials');

    const token = this.jwtService.sign({ id: 1 });

    return { message: 'User successfully logged in', token };
  }
  verifyToken() {
    return { valid: true };
  }
}
