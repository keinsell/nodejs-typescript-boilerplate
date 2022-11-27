import { JsonWebTokenService } from "../../common/lib/security/jsonwebtoken";
import { User } from "../user/entity";
import { UserRepository } from "../user/repository";
import { USER_JWT_PAYLOAD } from "./response";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

export class AuthenticationService {
	protected userRepository = new UserRepository();
	protected jwtService = new JsonWebTokenService();

	public strategy = new JwtStrategy(
		{
			jwtFromRequest:
				JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
			secretOrKey: this.jwtService.JWT_SECRET,
		},
		async (payload: USER_JWT_PAYLOAD, done: any) => {
			const user = this.userRepository.findById(payload.id);

			if (!user) {
				return done(null, false);
			}

			return done(null, user);
		}
	);

	generateNewAuthenticationToken(user: User) {
		return this.jwtService.sign<USER_JWT_PAYLOAD>({
			id: user.id,
			username: user.username,
		});
	}

	validateProvidedAuthenticationToken(token: string): boolean {
		const verified = this.jwtService.verify<USER_JWT_PAYLOAD>(token);

		if (!verified) {
			return false;
		}

		const user = this.userRepository.findById(verified.id);

		return !!user;
	}
}
