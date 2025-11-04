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
