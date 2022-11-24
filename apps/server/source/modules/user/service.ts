import { ILogger } from "../../common/lib/infrastructure/logger";
import { APPLICATION_CONFIGURATION } from "../../configuration/general";
import { RegisterUserService } from "./commands/register-user/service";

export class UserService {
	private logger: ILogger = APPLICATION_CONFIGURATION.logger;
	registerUser = new RegisterUserService().execute;
}
