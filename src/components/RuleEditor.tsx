import React, { useState } from 'react';
import { RuleData } from '../types/rule';
import RuleVisualizer from './RuleVisualizer';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { ruleService } from '../services/api';

const RuleEditor: React.FC = () => {
  const [ruleString, setRuleString] = useState('(age > 30 AND department = \'Sales\')');
  const [currentRule, setCurrentRule] = useState(null);
  const [testData, setTestData] = useState<RuleData>({
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 3
  });
  const [evaluationResult, setEvaluationResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleCreateRule = async () => {
    try {
      setLoading(true);
      setError('');
      const rule = await ruleService.createRule(ruleString);
      setCurrentRule(rule);
      setEvaluationResult(null);
    } catch (err) {
      setError('Invalid rule syntax. Please check your rule string.');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!currentRule) {
      setError('Please create a rule first.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const result = await ruleService.evaluateRule(currentRule.id, testData);
      setEvaluationResult(result.result);
    } catch (err) {
      setError('Error evaluating rule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Rule Editor</h2>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-500 hover:text-gray-700"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>

        {showHelp && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Rule Syntax Guide:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Use parentheses to group conditions: <code>(condition)</code></li>
              <li>Operators: <code>AND</code>, <code>OR</code></li>
              <li>Comparisons: <code>{'>'}</code>, <code>{'<'}</code>, <code>=</code>, <code>{'>='}</code>, <code>{'<='}</code></li>
              <li>String values must be in single quotes: <code>department = 'Sales'</code></li>
              <li>Numbers don't need quotes: <code>{'age > 30'}</code></li>
              <li>Example: <code>{'(age > 30 AND department = \'Sales\')'}</code></li>
            </ul>
          </div>
        )}
        
        {/* Rule Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rule String
          </label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            placeholder="Enter rule (e.g., (age > 30 AND department = 'Sales')"
            disabled={loading}
          />
          <button
            onClick={handleCreateRule}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Rule'}
          </button>
        </div>

        {/* Test Data */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Test Data</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(testData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => 
                    setTestData(prev => ({
                      ...prev,
                      [key]: typeof value === 'number' ? Number(e.target.value) : e.target.value
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  disabled={loading}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleEvaluate}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            disabled={loading || !currentRule}
          >
            {loading ? 'Evaluating...' : 'Evaluate Rule'}
          </button>
        </div>

        {/* Results */}
        {evaluationResult !== null && (
          <div className={`p-4 rounded-lg ${evaluationResult ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-medium">
              Rule evaluation result: {evaluationResult ? 'True' : 'False'}
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* AST Visualization */}
      {currentRule && (
        <div className="mt-8">
          <RuleVisualizer node={currentRule.ast} />
        </div>
      )}
    </div>
  );
};

export default RuleEditor;