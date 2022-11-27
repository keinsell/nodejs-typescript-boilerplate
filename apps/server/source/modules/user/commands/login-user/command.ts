import {
	Command,
	CommandProperties,
} from "../../../../common/lib/domain/command";

export class LoginUserCommand extends Command {
	readonly username: string;
	readonly password: string;

	constructor(properties: CommandProperties<LoginUserCommand>) {
		super(properties);
		this.username = properties.username;
		this.password = properties.password;
	}
}
