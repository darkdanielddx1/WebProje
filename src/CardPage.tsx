import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Resimleri import et
import card1 from './foto/card1.jpg';
import card2 from './foto/card2.jpg';
import card3 from './foto/card3.jpg';
import card4 from './foto/card4.jpg';

import { MonthlyCalendar } from './components/Calendar';
import { AstrologerInfo } from './components/AstrologerInfo';
import { X } from 'lucide-react';

function CardPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const images = [card1, card2, card3, card4];

  const handleCardClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Bilgilendirme
      </h1>

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Ana Sayfaya Dön
        </button>

        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          🔮 Randevu Al
        </button>
      </div>

      {/* Resim galerisi */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {images.map((image, index) => (
          <div key={index} className="relative" onClick={() => handleCardClick(image)}>
            <img
              src={image}
              alt={`card-${index}`}
              className="w-full h-auto rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Resim büyütme */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-30"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Bigger View"
            className="max-w-3xl max-h-full object-contain"
          />
        </div>
      )}

      {/* Takvim ekranı */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-90 p-8 z-40 overflow-auto">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <MonthlyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            {selectedDate && <AstrologerInfo selectedDate={selectedDate} />}
          </div>
          <button
            onClick={closeCalendar}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-500 shadow"
            aria-label="Close calendar"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CardPage;
