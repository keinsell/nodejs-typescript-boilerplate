export type BucketObject = {
	buffer: Buffer;
	filename: string;
	mime: string;
	extension: string;
};

export interface IBucket {
	getObject(filename: string): Promise<BucketObject | undefined>;
	putObject(filename: string, content: Buffer): Promise<void>;
	deleteObject(filename: string): Promise<void>;
	listObjects(): Promise<string[]>;
}
