import React, { useState } from 'react';
import { Settings, Play, Plus, Trash2 } from 'lucide-react';
import { Rule, UserData } from './types/ast';
import { RuleParser } from './utils/ruleParser';
import { RuleEvaluator } from './utils/ruleEvaluator';

const defaultRules: Rule[] = [
  {
    id: '1',
    name: 'Senior Sales Rule',
    ruleString: "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
    ast: new RuleParser().parse("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)")
  },
  {
    id: '2',
    name: 'Marketing Rule',
    ruleString: "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)",
    ast: new RuleParser().parse("((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)")
  }
];

function App() {
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [userData, setUserData] = useState<UserData>({
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 3
  });
  const [evaluationResult, setEvaluationResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = () => {
    if (!selectedRule) {
      setError('Please select a rule to evaluate');
      return;
    }

    try {
      const evaluator = new RuleEvaluator();
      const result = evaluator.evaluate(selectedRule.ast, userData);
      setEvaluationResult(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setEvaluationResult(null);
    }
  };

  const handleAddRule = () => {
    const newRule: Rule = {
      id: String(rules.length + 1),
      name: `Rule ${rules.length + 1}`,
      ruleString: '',
      ast: new RuleParser().parse("age > 0")
    };
    setRules([...rules, newRule]);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Rule Engine</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Rules Panel */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Rules</h2>
              <button
                onClick={handleAddRule}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Rule
              </button>
            </div>

            <div className="space-y-4">
              {rules.map(rule => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-lg border ${
                    selectedRule?.id === rule.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  } cursor-pointer hover:border-indigo-500 transition-colors`}
                  onClick={() => setSelectedRule(rule)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 break-all">{rule.ruleString}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRule(rule.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Panel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Evaluate Rule</h2>

            <div className="space-y-4">
              {Object.entries(userData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={typeof value === 'number' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => setUserData({
                      ...userData,
                      [key]: typeof value === 'number' ? Number(e.target.value) : e.target.value
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}

              <button
                onClick={handleEvaluate}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Play className="h-4 w-4 mr-2" />
                Evaluate Rule
              </button>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {evaluationResult !== null && !error && (
                <div className={`rounded-md ${evaluationResult ? 'bg-green-50' : 'bg-yellow-50'} p-4`}>
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${evaluationResult ? 'text-green-800' : 'text-yellow-800'}`}>
                        Evaluation Result
                      </h3>
                      <div className={`mt-2 text-sm ${evaluationResult ? 'text-green-700' : 'text-yellow-700'}`}>
                        Rule evaluation: {evaluationResult ? 'Passed' : 'Failed'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;