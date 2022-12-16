import { Entity } from "../../common/lib/domain/entity";
import { Factory } from "../../common/lib/patterns/factory";
import { FileMimeType } from "./entites/mime-type";

interface FileProperties {
	filename: string;
	path?: string;
	/** SHA-512 Hash of file */
	hash: string;
	/** Size of file in bytes */
	size: number;
	/** Content of the file as Buffer */
	content: Buffer;
	mime?: FileMimeType;
}

export class File extends Entity implements FileProperties {
	/** Filename of specific file. */
	filename: string;
	/** SHA-512 Hash of file */
	hash: string;
	/** Size of file in bytes */
	size: number;
	/** Content of the file as Buffer */
	content: Buffer;
	mime?: FileMimeType;
	constructor(properties: FileProperties, id?: string | number) {
		super(id);
		this.filename = properties.filename;
		this.hash = properties.hash;
		this.size = properties.size;
		this.content = properties.content;
		this.mime = properties.mime;
	}
}

export class Video extends File {}
export class Document extends File {}

export class Photo extends File {
	width: number;
	height: number;
	constructor(properties: { file: File; width: number; height: number }) {
		super(properties.file);
		this.width = properties.width;
		this.height = properties.height;
	}
}
