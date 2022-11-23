import { config } from "dotenv";
// eslint-disable-next-line node/no-extraneous-import
import findUp from "find-up";
import { bool, cleanEnv, num, str } from "envalid";

// Load .env file
config({ path: findUp.sync(".env") });

// Validate environment variables
export const ENVIRONMENT_VARIABLES = cleanEnv(process.env, {
	// Server
	NODE_ENV: str({
		choices: ["development", "production", "testing"],
		default: "development",
	}),

	// General Configuration
	REPOSITORY_NAME: str(),

	// S3-Related
	S3_ENDPOINT: str(),
	S3_PORT: num(),
	S3_ACCESS_KEY: str(),
	S3_SECRET_KEY: str(),
	S3_IMAGE_BUCKET: str(),
	S3_REGION: str(),
	S3_USE_SSL: bool(),
});
