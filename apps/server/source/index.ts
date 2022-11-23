import { HttpApplication } from "./application/http";
import logProcessErrors from "log-process-errors";
import { UserService } from "./modules/user/service";
import { S3Bucket } from "./common/lib/infrastructure/bucket/s3.bucket";
import { IpfsBucket } from "./common/lib/infrastructure/bucket/ipfs.bucket";
logProcessErrors();

export async function main() {
	new HttpApplication().bootstrap();
	new UserService().createUser();
}

await main();

const x = await new IpfsBucket().get(
	"QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx"
);

console.log(x);

if (x) {
	const y = await new S3Bucket().put(x.buffer);
	console.log(y);
}
