export type ASTNode = 
	| { type: "say", value: string };

export type AST = ASTNode[];

