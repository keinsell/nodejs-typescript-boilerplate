import http from "node:http";
import { Server, Socket } from "socket.io";

export class WebsocketServer {
	public socket: Server;

	constructor(server: http.Server) {
		this.socket = new Server(server);
		// Console.log address of websocket server
		this.socket.on("connection", (socket: Socket) => {
			console.log("Connected to websocket", socket.handshake.address);
		});
	}

	public listen(): void {
		this.socket.on("connect", () => {
			console.log("Connected to websocket");
		});

		this.socket.on("disconnect", () => {
			console.log("Disconnected from websocket");
		});
	}
}

export class WebsocketChannelInstance {
	private connection: Server;

	constructor(private server: http.Server, public channel: string) {
		this.server = server;
		this.channel = channel;
		this.connection = new Server(this.server, {
			path: this.channel,
		});
	}

	public emit(event: string, data: any): void {
		this.connection.emit(event, data);
	}

	public on(event: string, callback: (data: any) => void): void {
		this.connection.on(event, callback);
	}
}

export const WEBSOCKET_SERVER_INSTANCE = http.createServer();
