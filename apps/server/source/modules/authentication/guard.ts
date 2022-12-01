import { Guard } from "../../common/lib/domain/guard";
import { Request } from "@tinyhttp/app";
import { JsonWebTokenService } from "../../common/services/jsonwebtoken";

export class AuthenticationGuard extends Guard {
	protected jwtService = new JsonWebTokenService();

	isAuthorizationTokenValid(authorizationToken: string): boolean {
		try {
			this.jwtService.verify(authorizationToken);
			return true;
		} catch (error) {
			return false;
		}
	}

	isAuthorizationTokenValidFromRequest(request: Request): boolean {
		const authorizationToken = request.headers.authorization;

		if (!authorizationToken) {
			return false;
		}

		return this.isAuthorizationTokenValid(authorizationToken);
	}
}
