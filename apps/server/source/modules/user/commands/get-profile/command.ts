import {
	Command,
	CommandProperties,
} from "../../../../common/lib/domain/command";

export class GetProfileCommand extends Command {
	readonly userId: string;
	constructor(properties: CommandProperties<GetProfileCommand>) {
		super(properties);
		this.userId = properties.userId;
	}
}
