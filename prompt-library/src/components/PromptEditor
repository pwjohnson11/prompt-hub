import React, { useState } from 'react';
import { Prompt } from '../types';

interface Props {
  prompt: Prompt;
  onSave: (prompt: Prompt) => void;
  onCancel: () => void;
}

const PromptEditor: React.FC<Props> = ({ prompt, onSave, onCancel }) => {
  const [form, setForm] = useState<Prompt>(prompt);

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded-md px-3 py-2"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          className="w-full border rounded-md px-3 py-2"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Prompt Template</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 h-32"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          placeholder="Use placeholders like {client}, {industry}, {goal}"
        />
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onSave(form)} className="bg-schermerBlue text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
        <button onClick={onCancel} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
      </div>
    </div>
  );
};

export default PromptEditor;
