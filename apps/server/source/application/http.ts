import { App } from "@tinyhttp/app";
import bodyparser from "body-parser";
import { lruSend } from "lru-send";
import cors from "cors";
import {
	generateRoutes,
	generateSpec,
	ExtendedRoutesConfig,
	ExtendedSpecConfig,
} from "tsoa";
import { APPLICATION_CONFIGURATION } from "../configuration/general";
import { LoginUserController } from "../modules/user/commands/login-user/controller";
import passport from "passport";
import { jwtAuthorizationStrategy } from "../modules/authentication/strategy";
import { GetProfileController } from "../modules/user/commands/get-profile/controller";
import { RegisterUserController } from "../modules/user/commands/register-user/controller";

export class HttpApplication {
	private application: App;

	constructor() {
		this.application = new App();
		this.applyDevelopmentMiddleware();
		this.applyProductionMiddleware();
		this.applyMiddleware();
		this.attachComponents();
	}

	protected applyMiddleware() {
		this.application.use(bodyparser.json());
		this.application.use(bodyparser.urlencoded());
		this.application.use(lruSend());
		this.application.options("*", cors());

		passport.use(jwtAuthorizationStrategy);
	}

	protected applyDevelopmentMiddleware() {}
	protected applyProductionMiddleware() {}

	protected attachComponents() {
		this.application.post("/login", (request, response) =>
			new LoginUserController().execute(request, response)
		);
		this.application.post("/register", (request, response) =>
			new RegisterUserController().execute(request, response)
		);
		this.application.get(
			"/me",
			passport.authenticate("jwt", { session: false }),
			(request, response) =>
				new GetProfileController().execute(request, response)
		);
	}

	protected async openapi3() {
		const specOptions: ExtendedSpecConfig = {
			basePath: "",
			entryFile: "./api/server.ts",
			specVersion: 3,
			noImplicitAdditionalProperties: "silently-remove-extras",
			outputDirectory: "./",
			controllerPathGlobs: ["./**/*.controller.ts", "./**/controller.ts"],
			name: APPLICATION_CONFIGURATION.applicationName,
			description: "Documentation of ongoing API of application.",
			version: "1.0.0",
			schemes: ["http"],
			contact: {
				name: "Jakub Olan",
				email: "keinsell@protonmail.com",
			},
			yaml: true,
			specFileBaseName: "oas3",
			spec: {
				tags: [
					{
						name: "User",
						description: "Operations about users",
						externalDocs: {
							description: "Find out more about users",
							url: "http://swagger.io",
						},
					},
				],
			},
		};

		const routeOptions: ExtendedRoutesConfig = {
			basePath: "",
			noImplicitAdditionalProperties: "silently-remove-extras",
			entryFile: "./src/index.ts",
			routesDir: "./dist",
		};

		await generateSpec(specOptions);
		await generateRoutes(routeOptions);

		console.log("📝 OpenAPI 3.0 spec generated");
	}

	public async bootstrap() {
		await this.application.listen(1337);

		if (APPLICATION_CONFIGURATION.generateOpenApiDocumentation) {
			this.openapi3();
		}

		console.log("🚀 Server ready at: http://localhost:1337");
	}
}
