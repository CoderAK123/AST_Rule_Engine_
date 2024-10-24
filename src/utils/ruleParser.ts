import { ASTNode, Operator } from '../types/ast';

export class RuleParser {
  private pos = 0;
  private input = '';

  public parse(ruleString: string): ASTNode {
    this.pos = 0;
    this.input = ruleString.trim();
    return this.parseExpression();
  }

  private parseExpression(): ASTNode {
    let node = this.parseTerm();

    while (this.pos < this.input.length) {
      const operator = this.consumeOperator();
      if (!operator) break;

      const right = this.parseTerm();
      node = {
        type: 'operator',
        operator: operator as Operator,
        left: node,
        right
      };
    }

    return node;
  }

  private parseTerm(): ASTNode {
    this.consumeWhitespace();

    if (this.input[this.pos] === '(') {
      this.pos++; // Skip '('
      const node = this.parseExpression();
      this.pos++; // Skip ')'
      return node;
    }

    // Parse field, operator, and value
    const field = this.consumeIdentifier();
    const operator = this.consumeOperator();
    const value = this.consumeValue();

    return {
      type: 'operand',
      field,
      operator: operator as Operator,
      value
    };
  }

  private consumeWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  private consumeIdentifier(): string {
    this.consumeWhitespace();
    let identifier = '';
    
    while (this.pos < this.input.length && /[a-zA-Z_]/.test(this.input[this.pos])) {
      identifier += this.input[this.pos];
      this.pos++;
    }

    return identifier;
  }

  private consumeOperator(): string | null {
    this.consumeWhitespace();
    const operators = ['AND', 'OR', '>', '<', '=', '>=', '<='];
    
    for (const op of operators) {
      if (this.input.substr(this.pos, op.length) === op) {
        this.pos += op.length;
        return op;
      }
    }
    
    return null;
  }

  private consumeValue(): string | number {
    this.consumeWhitespace();
    let value = '';
    
    if (this.input[this.pos] === "'") {
      this.pos++; // Skip opening quote
      while (this.pos < this.input.length && this.input[this.pos] !== "'") {
        value += this.input[this.pos];
        this.pos++;
      }
      this.pos++; // Skip closing quote
      return value;
    }
    
    while (this.pos < this.input.length && /[0-9]/.test(this.input[this.pos])) {
      value += this.input[this.pos];
      this.pos++;
    }
    
    return Number(value);
  }
}