import { createReadStream } from "fs";

import run from "../src/main"; 

async function runner() {
	const stream = createReadStream("tests/hello_world/hello_world.mdlang", { encoding: "utf8" });
	await run(stream);
}

runner();
