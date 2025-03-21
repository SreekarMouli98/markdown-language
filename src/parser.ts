import { Readable } from "stream";
import { createInterface} from "readline";

type ASTNode = 
	| { type: "say", value: string };

type AST = ASTNode[];

export default function parse(stream: Readable): Promise<AST> {
	const reader = createInterface({ input: stream });
	const ast: AST = []
	return new Promise((resolve, reject) => {
		reader.on("line", (line) => {
			const trimmed = line.trim()
			if (!trimmed) return;

			const tokens = trimmed.split(" ");
			switch (tokens[0].toLowerCase()) {
				case 'say':
					const remainingLine = line.replace(tokens[0] + " ", "");
					const firstQuoteIndex = remainingLine.indexOf('"');
					const offset = firstQuoteIndex + 1
					const secondQuoteIndex = remainingLine
						.substring(offset, remainingLine.length)
						.indexOf('"') + offset;
					ast.push({
						"type": "say",
						"value": remainingLine.substring(offset, secondQuoteIndex),
					});
					break;
				default:
					throw new Error(`Unknown command "{tokens[0]}"`);
					break;
			}
		});
		reader.on("close", () => resolve(ast));
		reader.on("error", (err) => reject(err));
	});
}

