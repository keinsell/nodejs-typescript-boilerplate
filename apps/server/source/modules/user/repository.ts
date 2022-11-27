import { NotImplementedError } from "../../common/lib/domain/error/not-implemented";
import {
	IRepository,
	Paginated,
	PaginatedQueryParams,
} from "../../common/lib/domain/repository";
import { PrismaInfrastructre } from "../../infrastructure/prisma";
import { User } from "./entity";
import { UserMapper } from "./mapper";

export class UserRepository implements IRepository<User> {
	prisma = PrismaInfrastructre;
	mapper = new UserMapper();

	async save(entity: User): Promise<User> {
		const isRecordInDatabase = await this.findByUsername(entity.username);

		let updatedOrCreatedUser: User;

		if (isRecordInDatabase) {
			const updated = await this.prisma.user.update({
				where: {
					id: isRecordInDatabase.id,
				},
				data: this.mapper.toPersistence(entity),
			});

			updatedOrCreatedUser = this.mapper.toDomain(updated);
		}

		const created = await this.prisma.user.create({
			data: this.mapper.toPersistence(entity),
		});

		updatedOrCreatedUser = this.mapper.toDomain(created);

		return updatedOrCreatedUser;
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return null;
		}

		return this.mapper.toDomain(user);
	}

	async findByUsername(username: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			return null;
		}

		return this.mapper.toDomain(user);
	}

	findAll(): Promise<User[]> {
		throw new NotImplementedError("findAll() is not implemented");
	}

	findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<User>> {
		throw new NotImplementedError();
	}

	delete(id: string): Promise<void> {
		throw new NotImplementedError();
	}

	transaction<T>(callback: () => Promise<T>): Promise<T> {
		throw new NotImplementedError();
	}
}
