import { HttpApplication } from "./application/http";
import logProcessErrors from "log-process-errors";
import { UserService } from "./modules/user/service";
import { S3Bucket } from "./common/lib/infrastructure/bucket/s3.bucket";
import { IpfsBucket } from "./common/lib/infrastructure/bucket/ipfs.bucket";
import { RegisterUserCommand } from "./modules/user/commands/register-user/command";
import { UserRepository } from "./modules/user/repository";
import { PrismaInfrastructre } from "./infrastructure/prisma";
import { RegisterUserService } from "./modules/user/commands/register-user/service";
import { LoginUserService } from "./modules/user/commands/login-user/service";
import { LoginUserCommand } from "./modules/user/commands/login-user/command";
// logProcessErrors();

export async function main() {
	new HttpApplication().bootstrap();
	await PrismaInfrastructre.$connect();

	const users = await PrismaInfrastructre.user.findMany();
	console.log(users);

	const userWithUsername = await new UserRepository().findByUsername(
		"testuser"
	);

	console.log(userWithUsername);

	const registerUserCommand = new RegisterUserCommand({
		username: "keinsell",
		email: "jajek@protonmail.com",
		password: "securePassword",
	});

	const loginUserCommand = new LoginUserCommand({
		username: "keinsell",
		password: "securePassword",
	});

	await new RegisterUserService().execute(registerUserCommand);
	await new LoginUserService().execute(loginUserCommand);
}

await main();
