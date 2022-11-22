import { ILogger } from "../common/lib/infrastructure/logger";
import { ConsoleLogger } from "../common/lib/infrastructure/logger/console.logger";

/** Generic interface for injecting application-wide services such as loggers or switching specific features of application. */
export interface ApplicationContainerConfiguration {
	applicationName: string;
	/** Application-wide logger to be used. */
	logger: ILogger;
	generateOpenApiDocumentation: boolean;
}

export const APPLICATION_CONFIGURATION: ApplicationContainerConfiguration = {
	applicationName: "helloWorld",
	logger: new ConsoleLogger(),
	generateOpenApiDocumentation: false,
};
