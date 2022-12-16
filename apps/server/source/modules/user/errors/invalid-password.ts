import { ApplicationError } from "../../../common/lib/domain/error";

export class InvalidPasswordError extends ApplicationError {
	constructor(message: string = "USER_INVALID_PASSWORD") {
		super(message, 404);
	}
}
