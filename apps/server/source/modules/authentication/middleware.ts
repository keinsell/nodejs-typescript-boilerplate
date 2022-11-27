import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { User } from "../../models/user";
import { AuthenticationService } from "./service";

export class AuthenticationMiddleware {
	protected authenticationService = new AuthenticationService();

	initialize() {
		passport.use(this.authenticationService.strategy);
		return passport.authenticate("jwt", { session: false });
	}
}
