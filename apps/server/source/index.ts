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
import { GetProfileService } from "./modules/user/commands/get-profile/service";
import { GetProfileCommand } from "./modules/user/commands/get-profile/command";
// logProcessErrors();

export async function main() {
	new HttpApplication().bootstrap();
	await PrismaInfrastructre.$connect();
}

await main();
