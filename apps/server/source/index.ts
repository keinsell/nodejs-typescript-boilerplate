import { HttpApplication } from "./application/http";
import { PrismaInfrastructre } from "./infrastructure/prisma";

export async function main() {
	const httpApplication = new HttpApplication();
	httpApplication.bootstrap();
	await PrismaInfrastructre.$connect();
}

await main();
