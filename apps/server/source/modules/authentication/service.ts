/* eslint-disable node/file-extension-in-import */
import { JsonWebTokenService } from "../../common/services/jsonwebtoken";
import { User } from "../user/entity";
import { UserRepository } from "../user/repository";
import { JWT_TOKEN_PAYLOAD } from "./jwt-token-payload";

/** @deprecated */
export class AuthenticationService {
	protected userRepository = new UserRepository();
	protected jwtService = new JsonWebTokenService();
	generateNewAuthenticationToken(user: User) {
		return this.jwtService.sign<JWT_TOKEN_PAYLOAD>({
			id: user.id,
			username: user.username,
		});
	}

	validateProvidedAuthenticationToken(token: string): boolean {
		const verified = this.jwtService.verify<JWT_TOKEN_PAYLOAD>(token);

		if (!verified) {
			return false;
		}

		const user = this.userRepository.findById(verified.id);

		return !!user;
	}
}
