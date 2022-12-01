import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JsonWebTokenService } from "../../common/services/jsonwebtoken";
import { UserRepository } from "../user/repository";
import { USER_JWT_PAYLOAD } from "./response";

export const jwtAuthorizationStrategy = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: new JsonWebTokenService().JWT_SECRET,
		// TODO: Add issuer and audience
	},
	async (payload: USER_JWT_PAYLOAD, done) => {
		const userRepository = new UserRepository();

		const user = await userRepository.findById(payload.id);

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	}
);
