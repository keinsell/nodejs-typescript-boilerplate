export default {
	concurrency: 5,
	failFast: true,
	failWithoutAssertions: false,
	environmentVariables: {
		NODE_ENV: "testing",
	},
	verbose: false,
	nodeArguments: [
		"--loader=tsx",
		// "--experimental-specifier-resolution=node",
		"--no-warnings",
	],
	extensions: {
		ts: "module",
	},
};
