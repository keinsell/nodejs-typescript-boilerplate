import { ICommandHandler } from "../../../../common/lib/domain/command";
import { JsonWebTokenService } from "../../../../common/lib/security/jsonwebtoken";
import { UserRepository } from "../../repository";
import { GetProfileCommand } from "./command";

export class GetProfileService implements ICommandHandler<GetProfileCommand> {
	protected jwtService = new JsonWebTokenService();
	protected userRepository = new UserRepository();
	async execute(command: GetProfileCommand): Promise<unknown> {
		console.log(command);

		const token = command.authorizationToken;
		const decodedToken = this.jwtService.verify(token);

		const userId = decodedToken.id;

		const user = await this.userRepository.findById(userId);

		if (!user) {
			return {
				error: "User not found",
			};
		}

		return user;
	}
}
