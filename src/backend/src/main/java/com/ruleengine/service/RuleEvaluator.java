package com.ruleengine.service;

import com.ruleengine.model.ASTNode;
import com.ruleengine.model.UserData;
import org.springframework.stereotype.Service;

@Service
public class RuleEvaluator {
    public boolean evaluate(ASTNode node, UserData data) {
        if (node.getType().equals("operator")) {
            boolean leftResult = evaluate(node.getLeft(), data);
            boolean rightResult = evaluate(node.getRight(), data);

            return switch (node.getOperator()) {
                case "AND" -> leftResult && rightResult;
                case "OR" -> leftResult || rightResult;
                default -> throw new IllegalArgumentException("Unknown operator: " + node.getOperator());
            };
        }

        if (node.getType().equals("operand")) {
            Object fieldValue = switch (node.getField()) {
                case "age" -> data.getAge();
                case "department" -> data.getDepartment();
                case "salary" -> data.getSalary();
                case "experience" -> data.getExperience();
                default -> throw new IllegalArgumentException("Unknown field: " + node.getField());
            };

            Object nodeValue = node.getValue();
            if (fieldValue instanceof Number) {
                double numericFieldValue = ((Number) fieldValue).doubleValue();
                double numericNodeValue = Double.parseDouble(nodeValue.toString());

                return switch (node.getOperator()) {
                    case ">" -> numericFieldValue > numericNodeValue;
                    case "<" -> numericFieldValue < numericNodeValue;
                    case "=" -> numericFieldValue == numericNodeValue;
                    case ">=" -> numericFieldValue >= numericNodeValue;
                    case "<=" -> numericFieldValue <= numericNodeValue;
                    default -> throw new IllegalArgumentException("Unknown operator: " + node.getOperator());
                };
            } else {
                return node.getOperator().equals("=") && fieldValue.toString().equals(nodeValue);
            }
        }

        throw new IllegalArgumentException("Invalid node type: " + node.getType());
    }
}