import React, { useState, useEffect } from 'react';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, X } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodTrackerProps {
  onClose: () => void;
}

interface MoodEntry {
  date: string;
  mood: string;
  energy: string;
  note: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onClose }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const moods = [
    { icon: Smile, label: 'Happy', color: 'text-green-500', value: 3 },
    { icon: Meh, label: 'Neutral', color: 'text-yellow-500', value: 2 },
    { icon: Frown, label: 'Sad', color: 'text-blue-500', value: 1 },
  ];

  const energyLevels = [
    { icon: Sun, label: 'High', color: 'text-orange-500' },
    { icon: Cloud, label: 'Medium', color: 'text-gray-500' },
    { icon: CloudRain, label: 'Low', color: 'text-blue-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood || !selectedEnergy) return;

    const newEntry: MoodEntry = {
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: selectedMood,
      energy: selectedEnergy,
      note,
    };

    setMoodHistory(prev => [...prev, newEntry]);
    setSelectedMood(null);
    setSelectedEnergy(null);
    setNote('');
  };

  const chartData = {
    labels: moodHistory.slice(-7).map(entry => format(new Date(entry.date), 'MMM d')),
    datasets: [
      {
        label: 'Mood Level',
        data: moodHistory.slice(-7).map(entry => {
          const moodValue = moods.find(m => m.label === entry.mood)?.value || 2;
          return moodValue;
        }),
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: (value: number) => {
            return ['Sad', 'Neutral', 'Happy'][value - 1];
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowHistory(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !showHistory ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            Track Mood
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showHistory ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            View History
          </button>
        </div>

        {showHistory ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Mood History</h2>
            <div className="h-64 mb-8">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="space-y-4">
              {moodHistory.slice().reverse().map((entry, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">
                      {format(new Date(entry.date), 'MMMM d, yyyy')}
                    </span>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {entry.mood}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {entry.energy}
                      </span>
                    </div>
                  </div>
                  {entry.note && <p className="text-gray-600">{entry.note}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Mood</h3>
              <div className="grid grid-cols-3 gap-4">
                {moods.map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedMood(label)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedMood === label
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                    <span className="block text-sm font-medium text-gray-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Energy Level</h3>
              <div className="grid grid-cols-3 gap-4">
                {energyLevels.map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedEnergy(label)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedEnergy === label
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                    <span className="block text-sm font-medium text-gray-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Add a Note</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                rows={4}
                placeholder="How are you feeling today? What's on your mind?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Save Entry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;