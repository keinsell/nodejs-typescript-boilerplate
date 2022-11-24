import { ICommandHandler } from "../../../../common/lib/domain/command";
import { APPLICATION_CONFIGURATION } from "../../../../configuration/general";
import { UserRepository } from "../../repository";
import { LoginUserCommand } from "./command";

export class LoginUserService implements ICommandHandler<LoginUserCommand> {
	protected logger = APPLICATION_CONFIGURATION.logger;
	async execute(command: LoginUserCommand) {
		const userRepository = new UserRepository();

		const isUserByUsername = await userRepository.findByUsername(
			command.usernameOrEmail
		);

		if (!isUserByUsername) {
			throw new Error("User not found");
		}

		const user = isUserByUsername;

		const isPasswordValid = user.password.compare(command.password);

		if (!isPasswordValid) {
			throw new Error("Password is not valid");
		}

		this.logger.log("Found user and verified password", user);

		// TODO: Perepare JWT Token

		return user;
	}
}
