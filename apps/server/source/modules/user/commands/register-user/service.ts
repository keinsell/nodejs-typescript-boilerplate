import { ICommandHandler } from "../../../../common/lib/domain/command";
import { APPLICATION_CONFIGURATION } from "../../../../configuration/general";
import { Password, User } from "../../entity";
import { UserRepository } from "../../repository";
import { RegisterUserCommand } from "./command";

export class RegisterUserService
	implements ICommandHandler<RegisterUserCommand>
{
	userRepository = new UserRepository();
	logger = APPLICATION_CONFIGURATION.logger;
	async execute(command: RegisterUserCommand) {
		const user = new User({
			username: command.username,
			email: command.email,
			password: new Password(command.password),
		});

		const encryptedPassword = await user.password.hash();
		user.password = encryptedPassword;

		// Check if user already exists

		const isUserInDatabase = await this.userRepository.findByUsername(
			user.username
		);

		if (isUserInDatabase) {
			return {
				error: "User already exists",
			};
		}

		const savedUser = await this.userRepository.save(user);

		this.logger.log("User registered", savedUser);

		return savedUser;
	}
}
