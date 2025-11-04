/*
=====================
📦 PROMPT LIBRARY APP
React + TypeScript + TailwindCSS
=====================
Run this project:
1️⃣ npm create vite@latest prompt-library -- --template react-ts
2️⃣ cd prompt-library
3️⃣ Replace src/ and config files with this code
4️⃣ npm install && npm run dev
=====================
*/

// package.json
{
  "name": "prompt-library",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.2.2",
    "vite": "^4.4.9"
  }
}

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        schermerBlue: '#0072CE',
      },
    },
  },
  plugins: [],
}

// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-white text-gray-900;
  font-family: 'Inter', sans-serif;
}

// src/types.ts
export interface Prompt {
  id: string;
  title: string;
  category: string;
  content: string;
}

// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import PromptLibrary from './components/PromptLibrary';
import PromptFiller from './components/PromptFiller';
import { Prompt } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'library' | 'filler'>('library');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header view={view} setView={setView} />
      <main className="max-w-4xl mx-auto p-4">
        {view === 'library' && (
          <PromptLibrary onSelectPrompt={(p) => {
            setSelectedPrompt(p);
            setView('filler');
          }} />
        )}
        {view === 'filler' && selectedPrompt && (
          <PromptFiller prompt={selectedPrompt} goBack={() => setView('library')} />
        )}
      </main>
    </div>
  );
};

export default App;

// src/components/Header.tsx
import React from 'react';

interface Props {
  view: 'library' | 'filler';
  setView: (v: 'library' | 'filler') => void;
}

const Header: React.FC<Props> = ({ view, setView }) => {
  return (
    <header className="bg-white shadow mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-schermerBlue">Prompt Library</h1>
        <nav className="space-x-4">
          <button
            onClick={() => setView('library')}
            className={`font-medium ${view === 'library' ? 'text-schermerBlue' : 'text-gray-500'}`}
          >
            Library
          </button>
          <button
            onClick={() => setView('filler')}
            className={`font-medium ${view === 'filler' ? 'text-schermerBlue' : 'text-gray-500'}`}
          >
            Use Prompt
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// src/components/PromptLibrary.tsx
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
    if (prompts.find(p => p.id === prompt.id)) {
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

// src/components/PromptEditor.tsx
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

// src/components/PromptFiller.tsx
import React, { useMemo, useState } from 'react';
import { Prompt } from '../types';

interface Props {
  prompt: Prompt;
  goBack: () => void;
}

const PromptFiller: React.FC<Props> = ({ prompt, goBack }) => {
  const placeholders = useMemo(() => {
    const matches = prompt.content.match(/\{(.*?)\}/g) || [];
    return [...new Set(matches.map(m => m.replace(/[{}]/g, '')))]
  }, [prompt]);

  const [values, setValues] = useState<Record<string, string>>({});

  const filledPrompt = useMemo(() => {
    let text = prompt.content;
    Object.entries(values).forEach(([key, val]) => {
      text = text.replaceAll(`{${key}}`, val || `{${key}}`);
    });
    return text;
  }, [values, prompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(filledPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <button onClick={goBack} className="text-schermerBlue mb-4">← Back to Library</button>
      <h2 className="text-xl font-semibold mb-2">{prompt.title}</h2>
      <div className="grid gap-3 mb-4">
        {placeholders.map(ph => (
          <div key={ph}>
            <label className="block text-sm font-medium mb-1">{ph}</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={values[ph] || ''}
              onChange={e => setValues({ ...values, [ph]: e.target.value })}
              placeholder={`Enter ${ph}`}
            />
          </div>
        ))}
      </div>
      <h3 className="text-sm font-medium mb-1">Preview</h3>
      <textarea readOnly className="w-full border rounded-md px-3 py-2 h-32 mb-4">{filledPrompt}</textarea>
      <button onClick={handleCopy} className="bg-schermerBlue text-white px-4 py-2 rounded-md hover:bg-blue-600">Copy Prompt</button>
    </div>
  );
};

export default PromptFiller;

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
})
