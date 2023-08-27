import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';

type Payload = {
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(userData: LoginDto): Promise<AuthResponseDto> {
    try {
      const payload = { ...userData };
      const user = await this.userService.findOne(payload.email);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await compare(
        payload.password,
        user.passwordHash,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid sign in');
      }

      const token = await this.generateToken({ ...user });
      return {
        message: 'Login success',
        auth_token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(userData: RegisterDto): Promise<AuthResponseDto> {
    try {
      const payload = { ...userData };
      const found = await this.userService.findOne(payload.email);
      if (found) {
        throw new Error('Email already exists');
      }
      payload.password = await hash(payload.password, 10);

      const user = await this.userService.create(payload);
      if (!user) {
        throw new Error('Register failed');
      }
      const token = await this.generateToken({ ...user });

      return {
        message: 'Register success',
        auth_token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(payload: Payload) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
