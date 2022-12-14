import { ICommandHandler } from "../../../../common/lib/domain/command";
import { ApplicationError } from "../../../../common/lib/domain/error";
import { JsonWebTokenService } from "../../../../common/services/jsonwebtoken";
import { APPLICATION_CONFIGURATION } from "../../../../configuration/general";
import { InvalidPasswordError } from "../../errors/invalid-password";
import { UserNotFoundError } from "../../errors/user-not-found";
import { UserRepository } from "../../repository";
import { LoginUserCommand } from "./command";
// eslint-disable-next-line node/file-extension-in-import
import { LoginUserResponseDataTransferObject } from "./response";

export class LoginUserService implements ICommandHandler<LoginUserCommand> {
	protected logger = APPLICATION_CONFIGURATION.logger;
	async execute(
		command: LoginUserCommand
	): Promise<LoginUserResponseDataTransferObject | ApplicationError> {
		const userRepository = new UserRepository();
		const jwtService = new JsonWebTokenService();

		const isUserByUsername = await userRepository.findByUsername(
			command.username
		);

		if (!isUserByUsername) {
			return new UserNotFoundError();
		}

		const user = isUserByUsername;

		const isPasswordValid = user.password.compare(command.password);

		if (!isPasswordValid) {
			return new InvalidPasswordError();
		}

		const token = jwtService.sign({ id: user.id, username: user.username });

		this.logger.log(
			"Found user, verified password and generated JWT",
			token
		);

		return {
			username: user.username,
			id: user.id,
			email: user.email,
			token,
		};
	}
}
