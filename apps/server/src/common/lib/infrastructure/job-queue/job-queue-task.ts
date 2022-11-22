import { nanoid } from "nanoid";

export class JobQueueTask<Payload> {
	constructor(public data: Payload, public id?: string) {
		this.id = id || nanoid();
		this.data = data;
	}
}
