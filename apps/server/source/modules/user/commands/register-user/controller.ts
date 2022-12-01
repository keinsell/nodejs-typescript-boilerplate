/* eslint-disable node/file-extension-in-import */
import { Body, OperationId, Post, Response, Route, Tags } from "tsoa";
import { Controller } from "../../../../common/lib/application/controller";
import { RegisterUserCommand } from "./command";
import { CreateUserRequestDataTransferObject } from "./request";
import { RegisterUserResponseDataTransferObject } from "./response";
import { RegisterUserService } from "./service";

@Tags("User")
@Route()
export class RegisterUserController extends Controller {
	protected registerUserService = new RegisterUserService();

	@Post("register")
	@OperationId("register-user")
	@Response<RegisterUserResponseDataTransferObject>(200, "OK")
	protected async documentation(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() _body: CreateUserRequestDataTransferObject
	): Promise<RegisterUserResponseDataTransferObject | { error: string }> {
		throw new Error("Method not implemented.");
	}

	protected async executeImplementation(): Promise<unknown> {
		const { username, password, email } = this.req.body;

		if (!(username && password && email)) {
			return this.res.status(400).json({
				error: "Username, email and password are required",
			});
		}

		const command = new RegisterUserCommand({ username, password, email });

		const response = await this.registerUserService.execute(command);

		const isError = Object.assign(response).error;

		if (isError) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
