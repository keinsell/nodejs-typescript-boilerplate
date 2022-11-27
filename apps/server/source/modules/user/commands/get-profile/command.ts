import {
	Command,
	CommandProperties,
} from "../../../../common/lib/domain/command";

export class GetProfileCommand extends Command {
	readonly authorizationToken: string;
	constructor(properties: CommandProperties<GetProfileCommand>) {
		super(properties);
		this.authorizationToken = properties.authorizationToken;
	}
}
