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
