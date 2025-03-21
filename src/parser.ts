import { Readable } from "stream";
import { createInterface} from "readline";

import { AST } from "./types";

const COMMANDS = {
	say: /^Say\s+"([^"]*)"/,
};

export default function parse(stream: Readable): Promise<AST> {
	const reader = createInterface({ input: stream });
	return new Promise((resolve, reject) => {
		const ast: AST = []
		reader.on("line", (line) => {
			const trimmed = line.trim()
			if (!trimmed) return;

			let match;
			if (match = COMMANDS.say.exec(trimmed)) {
				ast.push({ type: 'say', value: match[1] });
				return;
			} else {
				throw new Error(`Couldn't parse line: "${trimmed}"`);
			}
		});
		reader.on("close", () => resolve(ast));
		reader.on("error", (err) => reject(err));
	});
}

