import { JsonWebTokenService } from "../../common/services/jsonwebtoken";
import { User } from "../user/entity";
import { UserRepository } from "../user/repository";
import { USER_JWT_PAYLOAD } from "./response";
import { Strategy as JwtStrategy } from "passport-jwt";

export class AuthenticationService {
	protected userRepository = new UserRepository();
	protected jwtService = new JsonWebTokenService();
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
