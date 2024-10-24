package com.ruleengine.controller;

import com.ruleengine.model.Rule;
import com.ruleengine.model.UserData;
import com.ruleengine.repository.RuleRepository;
import com.ruleengine.service.RuleEvaluator;
import com.ruleengine.service.RuleParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rules")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RuleController {
    private final RuleRepository ruleRepository;
    private final RuleParser ruleParser;
    private final RuleEvaluator ruleEvaluator;

    @GetMapping
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }

    @PostMapping
    public Rule createRule(@RequestBody Rule rule) {
        rule.setAst(ruleParser.parse(rule.getRuleString()));
        return ruleRepository.save(rule);
    }

    @PostMapping("/{id}/evaluate")
    public ResponseEntity<Boolean> evaluateRule(@PathVariable Long id, @RequestBody UserData userData) {
        return ruleRepository.findById(id)
                .map(rule -> ResponseEntity.ok(ruleEvaluator.evaluate(rule.getAst(), userData)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRule(@PathVariable Long id) {
        if (!ruleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ruleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}