import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BreathingProps {
  onClose: () => void;
}

const Breathing: React.FC<BreathingProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const cycle = async () => {
      setPhase('inhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
      setPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 4000));
      setPhase('exhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
    };

    const interval = setInterval(cycle, 12000);
    cycle();

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="fixed inset-0 bg-purple-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-purple-100 rounded-full"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Guided Breathing Exercise</h2>
        
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div
            className={`absolute inset-0 bg-purple-200 rounded-full transition-transform duration-4000 ease-in-out ${
              phase === 'inhale'
                ? 'scale-100'
                : phase === 'hold'
                ? 'scale-100'
                : 'scale-50'
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium text-purple-800">
              {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold...' : 'Breathe Out'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsActive(!isActive)}
          className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Breathing;