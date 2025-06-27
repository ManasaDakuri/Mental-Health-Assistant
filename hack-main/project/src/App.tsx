import React, { useState } from 'react';
import { Heart, Wind } from 'lucide-react';
import Breathing from './components/Breathing';
import Journal from './components/Journal';
import MoodTracker from './components/MoodTracker';
import SymptomsChecker from './components/SymptomsChecker';
import CrisisSupport from './components/CrisisSupport';
import Chatbot from './components/Chatbot';

function App() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Add floating hearts animation
  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 40),
      y: window.innerHeight,
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  React.useEffect(() => {
    const interval = setInterval(addHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderFeature = () => {
    switch (selectedFeature) {
      case 'breathing':
        return <Breathing onClose={() => setSelectedFeature(null)} />;
      case 'journal':
        return <Journal onClose={() => setSelectedFeature(null)} />;
      case 'mood':
        return <MoodTracker onClose={() => setSelectedFeature(null)} />;
      case 'symptoms':
        return <SymptomsChecker onClose={() => setSelectedFeature(null)} />;
      case 'crisis':
        return <CrisisSupport onClose={() => setSelectedFeature(null)} />;
      case 'chatbot':
        return <Chatbot onClose={() => setSelectedFeature(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none text-purple-500 animate-float"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'float 3s ease-out forwards',
          }}
        >
          <Heart className="w-8 h-8" />
        </div>
      ))}

      {selectedFeature ? (
        renderFeature()
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <Heart className="w-16 h-16 text-purple-500 mx-auto mb-8" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-6">
              Hello! We are with you!
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Your journey to mental well-being starts here. Find peace, practice mindfulness, and
              discover your inner strength.
            </p>
            <button
              onClick={() => setSelectedFeature('breathing')}
              className="mt-8 px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Begin Your Journey
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { id: 'symptoms', title: 'Mental Health Symptoms Checker', icon: Wind },
              { id: 'breathing', title: 'Guided Meditation', icon: Wind },
              { id: 'mood', title: 'Mood Tracking', icon: Heart },
              { id: 'journal', title: 'Daily Journal', icon: Heart },
              { id: 'crisis', title: 'Crisis Support', icon: Heart },
              { id: 'chatbot', title: 'AI Companion', icon: Heart },
            ].map(feature => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-left group"
              >
                <feature.icon className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">Click to explore</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;