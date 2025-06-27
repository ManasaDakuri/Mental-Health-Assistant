import React, { useState } from 'react';
import { Phone, MessageCircle, Heart, Youtube, X } from 'lucide-react';

interface CrisisSupportProps {
  onClose: () => void;
}

const relaxationVideos = [
  {
    id: '1',
    title: '10-Minute Meditation for Anxiety',
    url: 'https://www.youtube.com/embed/O-6f5wQXSu8',
    description: 'A guided meditation to help calm anxiety and racing thoughts.'
  },
  {
    id: '2',
    title: 'Breathing Exercises for Stress Relief',
    url: 'https://www.youtube.com/embed/acUZdGd_3Dg',
    description: 'Simple breathing techniques to reduce stress and promote relaxation.'
  },
  {
    id: '3',
    title: 'Calming Nature Sounds',
    url: 'https://www.youtube.com/embed/eKFTSSKCzWA',
    description: 'Peaceful nature sounds to help you relax and find inner peace.'
  }
];

const CrisisSupport: React.FC<CrisisSupportProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'support' | 'resources'>('support');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
            <Heart className="w-8 h-8" />
            Crisis Support
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'support' ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            Emergency Support
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'resources' ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            Online Resources
          </button>
        </div>

        {activeTab === 'support' ? (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-purple-800 font-semibold mb-2">
                If you're experiencing a mental health emergency:
              </p>
              <p className="text-purple-700">
                You're not alone. Help is available 24/7. Reach out to one of these support services immediately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-purple-500" />
                  <h3 className="font-semibold text-lg">Emergency Hotline</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  24/7 crisis counseling and support
                </p>
                <a
                  href="tel:988"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Call 988
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-purple-500" />
                  <h3 className="font-semibold text-lg">Text Support</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Text with a crisis counselor
                </p>
                <a
                  href="sms:988"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Text 988
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">Additional Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.samhsa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
                  >
                    SAMHSA's National Helpline
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nami.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
                  >
                    National Alliance on Mental Illness
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Relaxation & Mindfulness Videos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relaxationVideos.map(video => (
                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{video.title}</h4>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrisisSupport;