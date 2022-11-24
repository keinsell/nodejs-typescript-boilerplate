import {
	Command,
	CommandProperties,
} from "../../../../common/lib/domain/command";

export class LoginUserCommand extends Command {
	readonly usernameOrEmail: string;
	readonly password: string;

	constructor(properties: CommandProperties<LoginUserCommand>) {
		super(properties);
		this.usernameOrEmail = properties.usernameOrEmail;
		this.password = properties.password;
	}
}
