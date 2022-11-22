import { ILogger } from "../../common/lib/infrastructure/logger";
import { APPLICATION_CONFIGURATION } from "../../configuration/general";

export class UserService {
	private logger: ILogger = APPLICATION_CONFIGURATION.logger;
	createUser() {
		this.logger.debug("User created");
	}
}
