package com.ruleengine.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Rule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String ruleString;
    
    @OneToOne(cascade = CascadeType.ALL)
    private ASTNode ast;
}