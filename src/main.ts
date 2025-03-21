import { Readable } from "stream";

import parse from "./parser";
import interpret from "./interpreter";

export default async function run(stream: Readable) {
	const ast = await parse(stream);
	interpret(ast);
}
