package com.ruleengine.service;

import com.ruleengine.model.ASTNode;
import org.springframework.stereotype.Service;

@Service
public class RuleParser {
    private int pos = 0;
    private String input = "";

    public ASTNode parse(String ruleString) {
        pos = 0;
        input = ruleString.trim();
        return parseExpression();
    }

    private ASTNode parseExpression() {
        ASTNode node = parseTerm();

        while (pos < input.length()) {
            String operator = consumeOperator();
            if (operator == null) break;

            ASTNode right = parseTerm();
            ASTNode newNode = new ASTNode();
            newNode.setType("operator");
            newNode.setOperator(operator);
            newNode.setLeft(node);
            newNode.setRight(right);
            node = newNode;
        }

        return node;
    }

    private ASTNode parseTerm() {
        consumeWhitespace();

        if (input.charAt(pos) == '(') {
            pos++; // Skip '('
            ASTNode node = parseExpression();
            pos++; // Skip ')'
            return node;
        }

        String field = consumeIdentifier();
        String operator = consumeOperator();
        String value = consumeValue();

        ASTNode node = new ASTNode();
        node.setType("operand");
        node.setField(field);
        node.setOperator(operator);
        node.setValue(value);
        return node;
    }

    private void consumeWhitespace() {
        while (pos < input.length() && Character.isWhitespace(input.charAt(pos))) {
            pos++;
        }
    }

    private String consumeIdentifier() {
        consumeWhitespace();
        StringBuilder identifier = new StringBuilder();
        
        while (pos < input.length() && (Character.isLetterOrDigit(input.charAt(pos)) || input.charAt(pos) == '_')) {
            identifier.append(input.charAt(pos));
            pos++;
        }
        
        return identifier.toString();
    }

    private String consumeOperator() {
        consumeWhitespace();
        String[] operators = {"AND", "OR", ">", "<", "=", ">=", "<="};
        
        for (String op : operators) {
            if (input.startsWith(op, pos)) {
                pos += op.length();
                return op;
            }
        }
        
        return null;
    }

    private String consumeValue() {
        consumeWhitespace();
        StringBuilder value = new StringBuilder();
        
        if (input.charAt(pos) == '\'') {
            pos++; // Skip opening quote
            while (pos < input.length() && input.charAt(pos) != '\'') {
                value.append(input.charAt(pos));
                pos++;
            }
            pos++; // Skip closing quote
        } else {
            while (pos < input.length() && Character.isDigit(input.charAt(pos))) {
                value.append(input.charAt(pos));
                pos++;
            }
        }
        
        return value.toString();
    }
}