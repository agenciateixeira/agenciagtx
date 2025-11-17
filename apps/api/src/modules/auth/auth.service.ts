import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(payload: RegisterDto) {
    return {
      message: 'User registered via Supabase/Clerk',
      email: payload.email,
    };
  }

  async login(payload: LoginDto) {
    return this.signTokens(payload.email, 'client');
  }

  async refresh(payload: RefreshTokenDto) {
    try {
      const decoded = await this.jwtService.verifyAsync(payload.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return this.signTokens(decoded.sub, decoded.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private signTokens(subject: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: subject, role },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: subject, role },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }
}
