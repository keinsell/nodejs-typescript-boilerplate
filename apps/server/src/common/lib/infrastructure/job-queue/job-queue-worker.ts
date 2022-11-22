import { JobQueueTask } from "./job-queue-task";
import bull, { Job } from "bull";
import { nanoid } from "nanoid";

export abstract class JobQueueWorker<TaskPayload> {
	private readonly queueName: string;
	private readonly queueInstance: bull.Queue;
	constructor(queueName?: string) {
		this.queueName = queueName || nanoid();
		this.queueInstance = new bull(this.queueName, {
			redis: "redis://localhost:6379",
		});

		this.queueInstance.process(async (job: Job, done) => {
			try {
				await this.executeImplementation(job.data);
			} catch (error) {
				console.error(error);
			}
			done();
		});

		this.start();
	}

	abstract executeImplementation(
		task: JobQueueTask<TaskPayload>
	): Promise<void>;

	async start(): Promise<void> {
		this.queueInstance.resume();
	}
	async stop(): Promise<void> {
		this.queueInstance.pause();
	}
	async enqueue(task: JobQueueTask<TaskPayload>): Promise<void> {
		this.queueInstance.add(task);
	}
	async clear(): Promise<void> {
		await this.queueInstance.empty();
	}
}
