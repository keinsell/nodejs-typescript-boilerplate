import { Factory } from "../../common/lib/patterns/factory";
import { fileTypeFromBuffer } from "file-type";
import sizeOf from "image-size";
import { File, Photo, Video } from "./entity";
import hasha from "hasha";
import Document from "next/document";
import { FileMimeType } from "./entites/mime-type";

export class FileBuilder implements Factory {
	public async createFileFromBuffer(
		buffer: Buffer
	): Promise<File | Photo | Video> {
		// Get size of given buffer
		const sizeOfBuffer = buffer.byteLength;
		// Get type of buffer
		const typeOfBuffer = await fileTypeFromBuffer(buffer);

		// Extract mime of buffer type
		const mimeOfBuffer: FileMimeType | undefined = typeOfBuffer?.mime;

		/** SHA-512 hash of provided buffer, used to calculate unique filename and avoid duplicates of same files in storage. */
		const hash = await hasha.async(buffer, { algorithm: "sha512" });

		// Get extension of buffer
		const extensionOfBuffer = typeOfBuffer?.ext;

		// Create filename from hash and extension
		const filename = extensionOfBuffer
			? `${hash}.${extensionOfBuffer}`
			: `${hash}`;

		// Create a file entity
		const file = new File({
			size: sizeOfBuffer,
			filename,
			hash: hash,
			content: buffer,
			mime: mimeOfBuffer,
		});

		if (
			mimeOfBuffer && // If file is a image build Photo class
			mimeOfBuffer.startsWith("image")
		) {
			return await this.buildPhotoFromFile(file);
		}
		// If file is a video build Video class

		return file;
	}

	private async buildPhotoFromFile(file: File): Promise<Photo> {
		const dimensions = sizeOf(file.content);
		const width = dimensions.width;
		const height = dimensions.height;

		if (!width || !height) {
			throw new Error("Error while calculating dimensions of photo.");
		}

		const photo = new Photo({ file, width, height });

		return photo;
	}
}
