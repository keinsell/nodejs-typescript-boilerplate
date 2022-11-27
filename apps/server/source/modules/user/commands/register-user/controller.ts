/* eslint-disable node/file-extension-in-import */
import { Response } from "@tinyhttp/app";
import { Controller } from "../../../../common/lib/application/controller";
import { LoginUserCommand, RegisterUserCommand } from "./command";
import { LoginUserService, RegisterUserService } from "./service";

export class RegisterUserController extends Controller {
	protected registerUserService = new RegisterUserService();
	protected async executeImplementation(): Promise<Response<any>> {
		const { username, password, email } = this.req.body;

		if (!(username && password && email)) {
			return this.res.status(400).json({
				error: "Username, email and password are required",
			});
		}

		const command = new RegisterUserCommand({ username, password, email });

		const response = await this.registerUserService.execute(command);

		if (response.error) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
