import { Prisma } from "@prisma/client";
import { Mapper } from "../../common/lib/persistence/mapper";
import { DbRecords } from "../../common/lib/persistence/mapper/db-records";
import { Password, User } from "./entity";
import { UserDataTransferObject } from "./user.dto";

export class UserMapper
	implements Mapper<User, DbRecords.UserCreateRecord, UserDataTransferObject>
{
	toPersistence(entity: User): Prisma.UserCreateInput {
		return {
			username: entity.username,
			email: entity.email,
			password: entity.password._v,
		};
	}

	toDomain(record: any): User {
		return new User(
			{
				username: record.username,
				email: record.email,
				password: new Password(record.password),
			},
			record.id
		);
	}

	toResponse?(entity: User): UserDataTransferObject {
		return {
			username: entity.username,
			email: entity.email,
		};
	}
}
