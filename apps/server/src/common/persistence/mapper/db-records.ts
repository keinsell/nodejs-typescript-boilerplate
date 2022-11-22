import { Prisma, User } from "@prisma/client";

/**
 * `DbRecords` is a namespace that contains all the types with database records, this is useful for mapping domain entities into persistence records and vice versa.
 */
export namespace DbRecords {
	export type UserCreateRecord = Prisma.UserCreateInput;
	export type UserRecord = User;
}
