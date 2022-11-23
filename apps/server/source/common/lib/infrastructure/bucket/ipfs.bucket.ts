import * as IPFS from "ipfs-core";
import { BucketObject, IBucket } from ".";
import hasha from "hasha";
// eslint-disable-next-line node/no-extraneous-import
import { fileTypeFromBuffer } from "file-type";
import all from "it-all";
import { concat as uint8ArrayConcat } from "uint8arrays/concat";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { IpfsInfrastructure } from "../../../../infrastructure/ipfs";

export class IpfsBucket implements IBucket {
	constructor(public IpfsInstance: IPFS.IPFS = IpfsInfrastructure) {
		this.IpfsInstance = IpfsInstance;
	}
	async get(filenameOrHash: string): Promise<BucketObject | undefined> {
		// Check if file exists in ipfs
		const file = await this.IpfsInstance.get(filenameOrHash);

		// If there is no file return undefined
		if (!file) {
			return undefined;
		}

		// Get the file content
		const data = uint8ArrayConcat(
			await all(this.IpfsInstance.cat(filenameOrHash))
		);

		if (!data) {
			return undefined;
		}

		// Get the file type
		const filetype = await fileTypeFromBuffer(data);

		const mime = filetype?.mime || "application/text";
		const extension = filetype?.ext ?? "txt";

		// Prepare buffer with file
		const buffer = Buffer.from(data);

		// Prepare filename
		const sha512 = await hasha(buffer, { algorithm: "sha256" });
		const filename = `${sha512}.${extension}`;

		return {
			buffer,
			filename,
			mime,
			extension,
		};
	}

	async put(content: Buffer): Promise<BucketObject | undefined> {
		// Get the file type
		const filetype = await fileTypeFromBuffer(content);
		const mime = filetype?.mime || "application/text";
		const extension = filetype?.ext ?? "txt";
		const sha512 = await hasha(content, { algorithm: "sha256" });
		const filename = `${sha512}.${extension}`;

		const file = await this.IpfsInstance.add({
			path: filename,
			content: uint8ArrayFromString(content.toString()),
		});

		return {
			buffer: content,
			filename,
			cid: file.cid,
			mime,
			extension,
		};
	}

	delete(filenameOrHash: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	list(): Promise<string[]> {
		throw new Error("Method not implemented.");
	}
}
