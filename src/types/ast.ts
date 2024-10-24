export type NodeType = 'operator' | 'operand';
export type Operator = 'AND' | 'OR' | '>' | '<' | '=' | '>=' | '<=';

export interface ASTNode {
  type: NodeType;
  operator?: Operator;
  left?: ASTNode;
  right?: ASTNode;
  field?: string;
  value?: string | number;
}

export interface UserData {
  age: number;
  department: string;
  salary: number;
  experience: number;
}

export interface Rule {
  id: string;
  name: string;
  ruleString: string;
  ast: ASTNode;
}