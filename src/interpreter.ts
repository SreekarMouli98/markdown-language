import { AST } from './types';

class DataType {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

class Variable {
	name: string;
	dataType: DataType;


	constructor(name: string, dataType: string) {
		this.name = name;
		this.dataType = new DataType(dataType);
	}
}

class Function {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

class Memory {
	variables: Variable[];
	functions: Function[];

	constructor() {
		this.variables = [];
		this.functions = [];
	}
}

export default function interpret(ast: AST) {
	const memoryStack: Memory[] = [];
	for (let node of ast) {
		if (node.type == 'say') {
			console.log(node.value);
		}
	}
}
