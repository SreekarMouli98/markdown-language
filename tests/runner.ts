import { createReadStream } from "fs";

import parse from "../src/parser"; 

async function runner() {
	const stream = createReadStream("tests/hello_world/hello_world.mdlang", { encoding: "utf8" });
	const ast = await parse(stream);
	console.log("ast", ast);
}

runner();
