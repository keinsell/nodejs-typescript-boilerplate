import * as IPFS from "ipfs-core";
import { BucketObject, IBucket } from ".";
import hasha from "hasha";
import { fileTypeFromBuffer, MimeType } from "file-type";

export class IpfsBucket implements IBucket {
	constructor(public IpfsInstance: IPFS.IPFS) {
		this.IpfsInstance = IpfsInstance;
	}
	async get(filenameOrHash: string): Promise<BucketObject | undefined> {
		let stream: AsyncIterable<Uint8Array>;

		try {
			stream = this.IpfsInstance.get(filenameOrHash);
		} catch (error) {
			return undefined;
		}

		const decoder = new TextDecoder();
		let data = "";

		for await (const chunk of stream) {
			data += decoder.decode(chunk);
		}

		const buffer = Buffer.from(data);

		const filetype = await fileTypeFromBuffer(buffer);

		const mime = filetype?.mime || "application/zip";

		const sha512 = await hasha.async(buffer, { algorithm: "sha256" });

		const filename = `${sha512}.${filetype?.ext}`;

		return {
			buffer: buffer,
			filenameOrHash: filename,
			mime: mime,
			extension: filetype?.ext ?? "",
		};
	}

	put(content: Buffer): Promise<BucketObject | undefined> {
		throw new Error("Method not implemented.");
	}
	delete(filenameOrHash: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	list(): Promise<string[]> {
		throw new Error("Method not implemented.");
	}
}
