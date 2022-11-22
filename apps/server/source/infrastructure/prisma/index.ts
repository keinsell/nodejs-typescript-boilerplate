import { PrismaClient } from "@prisma/client";

const PrismaInfrastructre = new PrismaClient();

await PrismaInfrastructre.$connect();

export { PrismaInfrastructre };
