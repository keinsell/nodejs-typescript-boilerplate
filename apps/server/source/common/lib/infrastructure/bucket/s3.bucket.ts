import { BucketObject, IBucket } from ".";
// eslint-disable-next-line node/file-extension-in-import
import { APPLICATION_CONFIGURATION } from "../../../../configuration/general";
import { S3Infrastructure } from "../../../../infrastructure/s3";
import isBuffer from "is-buffer";
// eslint-disable-next-line node/no-extraneous-import
import { fileTypeFromBuffer } from "file-type";
import hasha from "hasha";

export class S3Bucket implements IBucket {
	constructor(
		public S3Instance: AWS.S3 = S3Infrastructure,
		public bucket = APPLICATION_CONFIGURATION.applicationName
	) {
		this.S3Instance = S3Instance;
		this.bucket = bucket;
	}

	async get(filenameOrHash: string): Promise<BucketObject | undefined> {
		const s3object = await this.S3Instance.getObject({
			Bucket: this.bucket,
			Key: filenameOrHash,
		}).promise();

		if (!s3object) {
			return;
		}

		const isObjectABuffer = isBuffer(s3object.Body);

		if (!isObjectABuffer) {
			return;
		}

		const fileType = await fileTypeFromBuffer(s3object.Body as Buffer);

		const mime = fileType?.mime || "application/text";
		const extension = fileType?.ext ?? "txt";

		return {
			buffer: s3object.Body as Buffer,
			filename: filenameOrHash,
			mime,
			extension,
		};
	}

	async put(content: Buffer): Promise<BucketObject | undefined> {
		const fileType = await fileTypeFromBuffer(content);

		const mime = fileType?.mime || "application/text";
		const extension = fileType?.ext ?? "txt";
		const sha512 = await hasha.async(content, { algorithm: "sha256" });
		const filename = `${sha512}.${extension}`;

		await this.S3Instance.putObject({
			Bucket: this.bucket,
			Key: filename,
			Body: content,
		}).promise();

		return {
			buffer: content,
			filename,
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
