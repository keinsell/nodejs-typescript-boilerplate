import { ICommandHandler } from "../../../../common/lib/domain/command";
import { JsonWebTokenService } from "../../../../common/services/jsonwebtoken";
import { UserRepository } from "../../repository";
import { GetProfileCommand } from "./command";
import { UserProfileDataTransferObject } from "./response";

export class GetProfileService implements ICommandHandler<GetProfileCommand> {
	protected jwtService = new JsonWebTokenService();
	protected userRepository = new UserRepository();
	async execute(
		command: GetProfileCommand
	): Promise<UserProfileDataTransferObject | { error: string }> {
		const userId = command.userId;

		const user = await this.userRepository.findById(userId);

		if (!user) {
			return {
				error: "User not found",
			};
		}

		return {
			id: user.id,
			username: user.username,
			email: user.email,
		};
	}
}
