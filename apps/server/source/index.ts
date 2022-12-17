import { HttpApplication } from "./application/http";
import { APPLICATION_CONFIGURATION } from "./configuration/general";
import { PrismaInfrastructre } from "./infrastructure/prisma";
import { FileBuilder } from "./modules/file/builder";
import { FilesystemStorage } from "./modules/file/storage/fs.storage";

export async function main() {
	const httpApplication = new HttpApplication();
	httpApplication.bootstrap();
	await PrismaInfrastructre.$connect();

	const sampleBufferWithText = Buffer.from(
		"Japierdole nie ogarniam tego pierdolnika...",
		"utf8"
	);

	const file = await new FileBuilder().createFileFromBuffer(
		sampleBufferWithText
	);

	console.log(file);

	const fileStorage = APPLICATION_CONFIGURATION.fileStorage;

	fileStorage.put(file);

	const x = await fileStorage.get("kews");

	console.log(x);

	console.log(await fileStorage.list());
}

await main();
