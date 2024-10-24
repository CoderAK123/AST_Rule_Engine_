import { ASTNode, UserData } from '../types/ast';

export class RuleEvaluator {
  public evaluate(node: ASTNode, data: UserData): boolean {
    if (node.type === 'operator') {
      const leftResult = this.evaluate(node.left!, data);
      const rightResult = this.evaluate(node.right!, data);

      switch (node.operator) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Unknown operator: ${node.operator}`);
      }
    }

    if (node.type === 'operand') {
      const fieldValue = data[node.field as keyof UserData];
      
      switch (node.operator) {
        case '>':
          return fieldValue > node.value;
        case '<':
          return fieldValue < node.value;
        case '=':
          return fieldValue === node.value;
        case '>=':
          return fieldValue >= node.value;
        case '<=':
          return fieldValue <= node.value;
        default:
          throw new Error(`Unknown operator: ${node.operator}`);
      }
    }

    throw new Error('Invalid node type');
  }
}