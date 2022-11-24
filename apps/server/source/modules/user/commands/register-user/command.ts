import {
	Command,
	CommandProperties,
} from "../../../../common/lib/domain/command";

export class RegisterUserCommand extends Command {
	readonly username: string;
	readonly email: string;
	readonly password: string;
	constructor(properties: CommandProperties<RegisterUserCommand>) {
		super(properties);
		this.username = properties.username;
		this.password = properties.password;
		this.email = properties.email;
	}
}
