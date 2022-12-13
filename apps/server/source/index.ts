import { HttpApplication } from "./application/http";
import { PrismaInfrastructre } from "./infrastructure/prisma";
import http from "http";
import {
	WebsocketChannelInstance,
	WebsocketServer,
	WEBSOCKET_SERVER_INSTANCE,
} from "./common/lib/application/websocket";

class Websockeeeet extends WebsocketChannelInstance {
	constructor() {
		super(WEBSOCKET_SERVER_INSTANCE, "");
	}

	public sendMessage(message: string) {
		this.on("message", (message: string) => {
			console.log(message);
		});
		this.emit("message", message);
	}
}

export async function main() {
	const httpApplication = new HttpApplication();
	httpApplication.bootstrap();
	new WebsocketServer(WEBSOCKET_SERVER_INSTANCE).listen();
	new Websockeeeet().sendMessage("Hello world");
	await PrismaInfrastructre.$connect();
}

await main();
