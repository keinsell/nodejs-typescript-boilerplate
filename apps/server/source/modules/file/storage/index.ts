import { File } from "../entity";

export interface IFileStorage {
	put(file: File): Promise<File>;

	get(hash: string): Promise<File | undefined>;

	delete(hash: string): Promise<void>;

	/** Provides list of keys (hashes,filenames) available on selected file stroage. */
	list(): Promise<string[]>;
}
