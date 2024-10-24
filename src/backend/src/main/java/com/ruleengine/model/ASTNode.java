package com.ruleengine.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ASTNode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String type;
    private String operator;
    private String field;
    private String value;
    
    @ManyToOne
    private ASTNode left;
    
    @ManyToOne
    private ASTNode right;
}