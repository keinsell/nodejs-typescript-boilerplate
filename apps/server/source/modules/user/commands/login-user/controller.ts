/* eslint-disable node/file-extension-in-import */
import { Controller } from "../../../../common/lib/application/controller";
import { LoginUserCommand } from "./command";
import { LoginUserService } from "./service";
import { Body, OperationId, Post, Response, Route, Tags } from "tsoa";
import { LoginUserResponseDataTransferObject } from "./response";
import { LoginUserRequestDataTransferObject } from "./request";

@Tags("User")
@Route()
export class LoginUserController extends Controller {
	protected service = new LoginUserService();

	@Post("login")
	@OperationId("login-user")
	@Response<LoginUserResponseDataTransferObject>(200, "OK")
	protected async documentation(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() _body: LoginUserRequestDataTransferObject
	): Promise<LoginUserResponseDataTransferObject | { error: string }> {
		throw new Error("Method not implemented.");
	}

	protected async executeImplementation() {
		// 1. Validate Permissions

		// 2. Validate Input to Command

		const { username, password } = this.req.body;

		if (!(username && password)) {
			return this.res.status(400).json({
				error: "Username and password are required",
			});
		}

		// 3. Construct Command

		const command = new LoginUserCommand({ username, password });

		// 4. Execute Command

		const response = await this.service.execute(command);

		// 6. Validate Response

		const isError = Object.assign(response).error;

		// 7. Return Response

		if (isError) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
