import axios from 'axios';
import { Rule, RuleData } from '../types/rule';

const API_URL = 'http://localhost:8080/api';

export const ruleService = {
  createRule: async (ruleString: string) => {
    const response = await axios.post(`${API_URL}/rules/create`, { ruleString });
    return response.data;
  },

  evaluateRule: async (ruleId: string, data: RuleData) => {
    const response = await axios.post(`${API_URL}/rules/${ruleId}/evaluate`, data);
    return response.data;
  },

  getRules: async () => {
    const response = await axios.get(`${API_URL}/rules`);
    return response.data;
  },

  deleteRule: async (ruleId: string) => {
    await axios.delete(`${API_URL}/rules/${ruleId}`);
  }
};