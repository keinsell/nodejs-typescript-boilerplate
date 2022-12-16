export interface IFileStorageRepository {
	create(file: any): Promise<unknown>;
	find(hash: string): Promise<unknown | undefined>;
	update(hash: string, file: any): Promise<unknown | undefined>;
	delete(hash: string): Promise<void>;
}
