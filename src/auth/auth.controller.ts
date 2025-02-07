import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto) {
    this.logger.log('User signing up...');
    return this.authService.signup(authCredentialsDto);
  }

  @Post('signin')
  signin(@Body() authCredentialsDto: AuthCredentialsDto) {
    this.logger.log('User signing in...');
    return this.authService.signin(authCredentialsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@GetUser() user) {
    this.logger.log('Getting user data...');
    return user;
  }
}
