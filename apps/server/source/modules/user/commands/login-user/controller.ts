/* eslint-disable node/file-extension-in-import */
import { Response } from "@tinyhttp/app";
import { Controller } from "../../../../common/lib/application/controller";
import { LoginUserCommand } from "./command";
import { LoginUserService } from "./service";

export class LoginUserController extends Controller {
	protected loginUserService = new LoginUserService();
	protected async executeImplementation(): Promise<Response<any>> {
		const { username, password } = this.req.body;

		if (!(username && password)) {
			return this.res.status(400).json({
				error: "Username and password are required",
			});
		}

		const command = new LoginUserCommand({ username, password });

		const response = await this.loginUserService.execute(command);

		if (response.error) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
