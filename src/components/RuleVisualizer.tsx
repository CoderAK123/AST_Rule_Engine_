import React from 'react';
import { Node } from '../types/rule';

interface Props {
  node: Node;
}

const RuleVisualizer: React.FC<Props> = ({ node }) => {
  if (!node) return null;

  const renderNode = (node: Node): JSX.Element => {
    if (node.type === 'operand') {
      return (
        <div className="bg-blue-100 p-2 rounded-lg">
          {node.field} {node.operator} {node.value}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <div className="bg-green-100 p-2 rounded-lg mb-2">{node.operator}</div>
        <div className="flex gap-4">
          <div className="border-t-2 border-gray-300 pt-2">
            {node.left && renderNode(node.left)}
          </div>
          <div className="border-t-2 border-gray-300 pt-2">
            {node.right && renderNode(node.right)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Rule Visualization</h3>
      {renderNode(node)}
    </div>
  );
};

export default RuleVisualizer;