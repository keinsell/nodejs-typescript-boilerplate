/* eslint-disable node/file-extension-in-import */
import { Response } from "@tinyhttp/app";
import { Controller } from "../../../../common/lib/application/controller";
import { User } from "../../entity";
import { GetProfileCommand } from "./command";
import { GetProfileService } from "./service";

export class GetProfileController extends Controller {
	protected service = new GetProfileService();
	protected async executeImplementation(): Promise<Response<any>> {
		const user = (this.req as any).user as User;

		const command = new GetProfileCommand({ userId: user.id });

		const response = await this.service.execute(command);

		if (response.error) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
