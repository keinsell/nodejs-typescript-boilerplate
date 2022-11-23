import * as IPFS from "ipfs-core";
import path from "node:path";

const IpfsInfrastructure = await IPFS.create({
	// eslint-disable-next-line unicorn/prefer-module
	repo: path.join(".cache", "ipfs", `${Math.random()}`),
	silent: true,
});

export { IpfsInfrastructure };
