import { Factory } from "../../common/lib/patterns/factory";
import { fileTypeFromBuffer, MimeType } from "file-type";
import sizeOf from "image-size";
import { File, Photo, Video } from "./entity";
import hasha from "hasha";
import Document from "next/document";

export class FileBuilder implements Factory {
	public async createFileFromBuffer(
		buffer: Buffer
	): Promise<File | Photo | Video | Document> {
		// Get size of given buffer
		const sizeOfBuffer = buffer.byteLength;
		// Get type of buffer
		const typeOfBuffer = await fileTypeFromBuffer(buffer);
		// Extract mime of buffer type
		const mimeOfBuffer = typeOfBuffer?.mime || "application/zip";
		// Get hash of buffer
		const hash = await hasha.async(buffer, { algorithm: "sha512" });
		// Create a file entity
		const file = new File();

		// If file is a image build Photo class
		if (mimeOfBuffer.startsWith("image")) {
			return await this.buildPhotoFromFile(file);
		}

		// If file is a video build Video class

		return file;
	}

	private async buildPhotoFromFile(file: File): Promise<Photo> {
		const dimensions = sizeOf(file.content);
		const width = dimensions.width;
		const height = dimensions.height;
	}
}
