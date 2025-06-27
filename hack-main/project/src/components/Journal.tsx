import React, { useState, useEffect } from 'react';
import { Book, X, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface JournalProps {
  onClose: () => void;
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

const Journal: React.FC<JournalProps> = ({ onClose }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState('');
  const [showEntries, setShowEntries] = useState(false);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry,
      mood: currentMood,
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
    setCurrentMood('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Daily Journal</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowEntries(!showEntries)}
              className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {showEntries ? 'New Entry' : 'View Entries'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {showEntries ? (
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Journal Entries</h3>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-50 rounded-lg p-6 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {format(new Date(entry.date), 'MMMM d, yyyy - h:mm a')}
                  </span>
                  {entry.mood && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {entry.mood}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))}
            {entries.length === 0 && (
              <p className="text-center text-gray-500">No journal entries yet.</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <select
                value={currentMood}
                onChange={(e) => setCurrentMood(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your mood</option>
                <option value="Happy">Happy</option>
                <option value="Calm">Calm</option>
                <option value="Anxious">Anxious</option>
                <option value="Sad">Sad</option>
                <option value="Energetic">Energetic</option>
                <option value="Tired">Tired</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="journal-entry" className="block text-sm font-medium text-gray-700 mb-2">
                Write your thoughts
              </label>
              <textarea
                id="journal-entry"
                rows={12}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="What's on your mind today? How are you feeling? What made you happy or challenged you today?"
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setCurrentEntry('')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Journal;