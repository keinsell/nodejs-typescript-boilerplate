import { HttpApplication } from "./application/http.application";
import logProcessErrors from "log-process-errors";
import { UserService } from "./modules/user/service";
import { IpfsBucket } from "./common/lib/infrastructure/bucket/ipfs.bucket";
import { IpfsInfrastructure } from "./infrastructure/ipfs";
logProcessErrors();

export async function main() {
	new HttpApplication().bootstrap();
	new UserService().createUser();
}

const x = await new IpfsBucket(IpfsInfrastructure).get(
	"QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx"
);

await main();
