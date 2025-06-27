import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface SymptomsCheckerProps {
  onClose: () => void;
}

const symptoms = [
  { id: 1, name: 'Feeling sad or down', severity: 0 },
  { id: 2, name: 'Excessive fears or worries', severity: 0 },
  { id: 3, name: 'Extreme mood changes', severity: 0 },
  { id: 4, name: 'Withdrawal from friends and activities', severity: 0 },
  { id: 5, name: 'Significant tiredness or low energy', severity: 0 },
  { id: 6, name: 'Problems sleeping', severity: 0 },
  { id: 7, name: 'Difficulty concentrating', severity: 0 },
  { id: 8, name: 'Changes in eating habits', severity: 0 }
];

const SymptomsChecker: React.FC<SymptomsCheckerProps> = ({ onClose }) => {
  const [userSymptoms, setUserSymptoms] = useState(symptoms);
  const [showResults, setShowResults] = useState(false);

  const handleSeverityChange = (id: number, value: number) => {
    setUserSymptoms(prev =>
      prev.map(symptom =>
        symptom.id === id ? { ...symptom, severity: value } : symptom
      )
    );
  };

  const calculateRisk = () => {
    const totalSeverity = userSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
    const maxPossibleSeverity = userSymptoms.length * 4;
    const riskPercentage = (totalSeverity / maxPossibleSeverity) * 100;
    return riskPercentage;
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage < 25) return { level: 'Low', color: 'text-green-600' };
    if (percentage < 50) return { level: 'Moderate', color: 'text-yellow-600' };
    if (percentage < 75) return { level: 'High', color: 'text-orange-600' };
    return { level: 'Severe', color: 'text-red-600' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Mental Health Symptoms Checker</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {!showResults ? (
            <>
              <p className="text-gray-600 mb-6">
                Rate how often you've experienced each symptom over the past two weeks:
              </p>
              <div className="space-y-6">
                {userSymptoms.map(symptom => (
                  <div key={symptom.id} className="space-y-2">
                    <p className="font-medium text-gray-700">{symptom.name}</p>
                    <div className="flex gap-4">
                      {[0, 1, 2, 3, 4].map(value => (
                        <button
                          key={value}
                          onClick={() => handleSeverityChange(symptom.id, value)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            symptom.severity === value
                              ? 'border-purple-600 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Never</span>
                      <span>Always</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowResults(true)}
                className="mt-8 w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                View Results
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Your Risk Assessment</h3>
                {(() => {
                  const riskPercentage = calculateRisk();
                  const { level, color } = getRiskLevel(riskPercentage);
                  return (
                    <div className="space-y-4">
                      <p className={`text-3xl font-bold ${color}`}>
                        {level} Risk
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${calculateRisk()}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">What should I do next?</h4>
                <ul className="space-y-2 text-purple-700">
                  <li>• Consider discussing these results with a mental health professional</li>
                  <li>• Continue monitoring your symptoms using our mood tracker</li>
                  <li>• Practice self-care and stress management techniques</li>
                  <li>• Reach out to our crisis support if you need immediate help</li>
                </ul>
              </div>

              <button
                onClick={() => setShowResults(false)}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Check Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomsChecker;