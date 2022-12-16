import { Entity } from "../../common/lib/domain/entity";
import { Factory } from "../../common/lib/patterns/factory";

interface FileProperties {
	filename: string;
	path?: string;
	/** SHA-512 Hash of file */
	hash: string;
	/** Size of file in bytes */
	size: number;
	/** Content of the file as Buffer */
	content: Buffer;
}

export class File extends Entity implements FileProperties {
	filename: string;
	path?: string;
	/** SHA-512 Hash of file */
	hash: string;
	/** Size of file in bytes */
	size: number;
	/** Content of the file as Buffer */
	content: Buffer;
	constructor(properties: FileProperties, id?: string | number) {}
}

export class Video extends File {}
export class Document extends File {}
export class Photo extends File {}
