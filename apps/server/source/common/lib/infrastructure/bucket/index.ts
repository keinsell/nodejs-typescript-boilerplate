import type { CID } from "multiformats/cid";

export type BucketObject = {
	buffer: Buffer;
	filename: string;
	cid?: CID;
	mime: string;
	extension: string;
};

export interface IBucket {
	get(filenameOrHash: string | CID): Promise<BucketObject | undefined>;
	put(content: Buffer): Promise<BucketObject | undefined>;
	delete(filenameOrHash: string | CID): Promise<boolean>;
	list(): Promise<string[]>;
}
