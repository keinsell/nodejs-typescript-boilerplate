import { ILogger } from "../common/lib/infrastructure/logger";
import { ConsoleLogger } from "../common/lib/infrastructure/logger/console.logger";
import { IHashingService } from "../common/lib/security/hashing";
import { Argon2HashingService } from "../common/lib/security/hashing/argon2.hashing";

/** Generic interface for injecting application-wide services such as loggers or switching specific features of application. */
export interface ApplicationContainerConfiguration {
	applicationName: string;

	/** Application-wide logger to be used. */
	logger: ILogger;

	/** Application-wide solution for hashing pieces of information and comparing them to check if such data is the same. Used mostly for passwords. */
	hashing: IHashingService;

	generateOpenApiDocumentation: boolean;
}

export const APPLICATION_CONFIGURATION: ApplicationContainerConfiguration = {
	applicationName: "helloWorld",
	logger: new ConsoleLogger(),
	hashing: new Argon2HashingService(),
	generateOpenApiDocumentation: false,
};
