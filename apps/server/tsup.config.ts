import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["source"],
	splitting: true,
	target: "node18",
	sourcemap: true,
	clean: true,
});
