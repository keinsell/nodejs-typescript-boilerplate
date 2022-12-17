import { IFileStorage } from ".";
import { FileBuilder } from "../builder";
import { File } from "../entity";
import fs from "node:fs";

// FilesystemStorage implements the IFileStorage interface
// by storing files on the local filesystem. The storage
// directory is provided in the constructor.
export class FilesystemStorage implements IFileStorage {
	constructor(private storageDirectory: string) {
		// Check if directory exists in filesystem if not create it
		if (!fs.existsSync(this.storageDirectory)) {
			fs.mkdirSync(this.storageDirectory, { recursive: true });
		}
	}

	put(file: File): Promise<File> {
		// Check if file exists in filesystem if not create it
		if (!fs.existsSync(`${this.storageDirectory}/${file.filename}`)) {
			fs.writeFileSync(
				`${this.storageDirectory}/${file.filename}`,
				file.content
			);
		}
		return Promise.resolve(file);
	}

	// TODO: If we have directories in storage directory this function will not work properly - there probably we need some improvment.
	async get(hash: string): Promise<File | undefined> {
		// Find a file with the given hash
		let fileWithHashInFilename = fs
			.readdirSync(this.storageDirectory)
			.find((filename) => filename.startsWith(hash));

		// If file with hash in filename is not found return undefined
		if (!fileWithHashInFilename) {
			return undefined;
		}

		// Read file from filesystem
		const fileContent = fs.readFileSync(
			`${this.storageDirectory}/${fileWithHashInFilename}`
		);

		// Create file from buffer
		return await new FileBuilder().createFileFromBuffer(fileContent);
	}

	/**
	 * Deletes a hash from the store.
	 * @param hash The hash to delete.
	 */
	async delete(hash: string): Promise<void> {
		// Find a file with the given hash
		const fileWithHashInFilename = fs
			.readdirSync(this.storageDirectory)
			.find((filename) => filename.startsWith(hash));

		// If file with hash in filename is not found return undefined
		if (!fileWithHashInFilename) {
			return;
		}

		// Delete file from filesystem
		fs.unlinkSync(`${this.storageDirectory}/${fileWithHashInFilename}`);
	}

	async list(): Promise<string[]> {
		// Get list of files in storage directory
		const files = fs.readdirSync(this.storageDirectory);

		// If storage directory contains other directories get list of files in those directories
		for (const file of files) {
			if (
				fs.lstatSync(`${this.storageDirectory}/${file}`).isDirectory()
			) {
				files.push(
					...fs
						.readdirSync(`${this.storageDirectory}/${file}`)
						.map((filename) => `${file}/${filename}`)
				);

				// Remove directory from list of files
				files.splice(files.indexOf(file), 1);
			}
		}

		// Return list of files
		return files;
	}
}
