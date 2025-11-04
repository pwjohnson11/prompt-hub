import React, { useMemo, useState } from 'react';
import { Prompt } from '../types';

interface Props {
  prompt: Prompt;
  goBack: () => void;
}

const PromptFiller: React.FC<Props> = ({ prompt, goBack }) => {
  const placeholders = useMemo(() => {
    const matches = prompt.content.match(/\{(.*?)\}/g) || [];
    return [...new Set(matches.map(m => m.replace(/[{}]/g, '')))];
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
      <textarea readOnly className="w-full border rounded-md px-3 py-2 h-32 mb-4" value={filledPrompt} />
      <button onClick={handleCopy} className="bg-schermerBlue text-white px-4 py-2 rounded-md hover:bg-blue-600">Copy Prompt</button>
    </div>
  );
};

export default PromptFiller;
