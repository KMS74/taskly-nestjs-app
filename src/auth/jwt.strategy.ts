import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'topSecret51', // TODO: Move to env file or use a more secure way like AWS KMS or Azure Key Vault to store secrets
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    // find user in the database by username
    const user = await this.userRepository.findOneBy({ username });

    // if user is not found or invalid, throw an unauthorized exceptions
    if (!user) {
      throw new UnauthorizedException();
    }

    // return the user if found (this will be injected in the request object)
    return user;
  }
}
