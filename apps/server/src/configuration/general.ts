import { ILogger } from "../common/lib/infrastructure/logger";
import { ConsoleLogger } from "../common/lib/infrastructure/logger/console.logger";

export interface ApplicationContainerConfiguration {
	applicationName: string;
	logger: ILogger;
}

export const APPLICATION_CONFIGURATION: ApplicationContainerConfiguration = {
	applicationName: "helloWorld",
	logger: new ConsoleLogger(),
};
