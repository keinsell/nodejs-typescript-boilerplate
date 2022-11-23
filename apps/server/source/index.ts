import { HttpApplication } from "./application/http.application";
import logProcessErrors from "log-process-errors";
import { UserService } from "./modules/user/service";
logProcessErrors();

export async function main() {
	new HttpApplication().bootstrap();
	new UserService().createUser();
}

await main();
