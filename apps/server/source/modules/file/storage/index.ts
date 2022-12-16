import { File } from "../entity";

export interface IFileStorage {
	put(file: File): Promise<File>;
	get(hash: string): Promise<File | undefined>;
	delete(hash: string): Promise<void>;
}
