import { HttpApplication } from "./application/http";
import { PrismaInfrastructre } from "./infrastructure/prisma";

export async function main() {
	new HttpApplication().bootstrap();
	await PrismaInfrastructre.$connect();
}

await main();
