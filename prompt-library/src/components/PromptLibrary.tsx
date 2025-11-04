import React, { useEffect, useState } from 'react';
import { Prompt } from '../types';
import { v4 as uuidv4 } from 'uuid';
import PromptEditor from './PromptEditor';

const defaultPrompts: Prompt[] = [
  {
    id: uuidv4(),
    title: 'Market Research Analysis',
    category: 'Research',
    content: 'Write a competitive market analysis for {client} in the {industry} industry. Include key trends, customer segments, and 3 main competitors.',
  },
  {
    id: uuidv4(),
    title: 'Ad Copy Variations',
    category: 'Copywriting',
    content: 'Create three variations of ad copy for {client} targeting {audience} with a focus on {goal}. Keep tone {tone}.',
  },
  {
    id: uuidv4(),
    title: 'Marketing Strategy Plan',
    category: 'Strategy',
    content: 'Develop a 3-month marketing strategy for {client} in the {industry} industry. Focus on {goal} and measurable KPIs.',
  }
];

interface Props {
  onSelectPrompt: (prompt: Prompt) => void;
}

const PromptLibrary: React.FC<Props> = ({ onSelectPrompt }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('prompts');
    if (stored) setPrompts(JSON.parse(stored));
    else setPrompts(defaultPrompts);
  }, []);

  const saveToStorage = (list: Prompt[]) => {
    setPrompts(list);
    localStorage.setItem('prompts', JSON.stringify(list));
  };

  const handleDelete = (id: string) => {
    const updated = prompts.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  const handleSave = (prompt: Prompt) => {
    let updated: Prompt[];
    if (prompts.find(p => p.id === prompt.id && prompt.id)) {
      updated = prompts.map(p => (p.id === prompt.id ? prompt : p));
    } else {
      updated = [...prompts, { ...prompt, id: uuidv4() }];
    }
    saveToStorage(updated);
    setEditingPrompt(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Prompts</h2>
        <button
          onClick={() => setEditingPrompt({ id: '', title: '', category: '', content: '' })}
          className="bg-schermerBlue text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Add Prompt
        </button>
      </div>

      {editingPrompt ? (
        <PromptEditor prompt={editingPrompt} onSave={handleSave} onCancel={() => setEditingPrompt(null)} />
      ) : (
        <div className="grid gap-4">
          {prompts.map(prompt => (
            <div key={prompt.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="font-medium">{prompt.title}</h3>
                <p className="text-sm text-gray-500">{prompt.category}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onSelectPrompt(prompt)}
                  className="px-3 py-1 bg-schermerBlue text-white rounded-md text-sm hover:bg-blue-600"
                >Use</button>
                <button
                  onClick={() => setEditingPrompt(prompt)}
                  className="px-3 py-1 border border-gray-300 text-sm rounded-md hover:bg-gray-100"
                >Edit</button>
                <button
                  onClick={() => handleDelete(prompt.id)}
                  className="px-3 py-1 border border-red-300 text-red-600 text-sm rounded-md hover:bg-red-50"
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptLibrary;
