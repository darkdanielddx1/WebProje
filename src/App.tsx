import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MonthlyCalendar } from './components/Calendar';
import { AstrologerInfo } from './components/AstrologerInfo';
import CardPage from './CardPage';
import { Sun, Moon,  X } from 'lucide-react'; // X (close) ikonu ekledik

function MainPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Takvimi kapatma işlevi
  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/fotoo/card5.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-screen px-6 py-12 gap-12">
        
        {/* Sol panel */}
        <div className="bg-black bg-opacity-30  rounded-2xl p-16 text-white max-w-2xl w-full h-auto   shadow-white backdrop-blur-[10px] border border-white/10 transition-transform duration-700 ease-in-out  transform hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(163,136,238,0.6)]">
          <div className="flex items-center justify-center mb-8">
           
            <h1 className="text-5xl font-extrabold text-white drop-shadow-5xl"> ✨ Hoş Geldiniz ✨</h1>
            
          </div>
          <p className="text-center mb-6 font-thin">Danışmanlık için randevu alın, yıldızlar sizinle konuşsun.</p>
          <div className="flex items-center flex-col gap-4">
            <button
              onClick={() => navigate('/card')}
              className="flex items-center justify-center gap-2 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-green-600 h-12 w-40"
            >
              
              📜 Bilgilendirme
            </button>
            <button
              onClick={() => setShowCalendar(true)}
              className="flex items-center justify-center gap-2 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-green-600 h-12 w-40 "
            >
              
              🔮 Randevu Al
            </button>
          </div>
        </div>

        {/* Sağ panel */}
        <div className="bg-gray-20 bg-opacity-50 backdrop-blur-md text-white rounded-2xl p-8 max-w-md w-full transition-all   transform hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(163,136,238,0.6)]">
          <h2 className="text-xl font-extrabold mb-2">🔭 AstroRandevu</h2>
          <p className='font-thin'>Uzman astrologlarla birebir görüşmeler için randevu alın. Gökyüzü rehberiniz olsun.</p>
        </div>
      </div>

      {/* Takvim ekranı */}
      {showCalendar && (
  <div className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-90 p-8 z-20 overflow-auto">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
      <MonthlyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {selectedDate && <AstrologerInfo selectedDate={selectedDate} />}
    </div>

    {/* Bilgilendirme Butonu */}
    <div className="flex justify-center mt-6">
      <button
        onClick={() => {
          setShowCalendar(false); // Takvimi kapat
          navigate('/card'); // Bilgilendirme sayfasına yönlendir
        }}
        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition"
      >
        📜 Bilgilendirme
      </button>
    </div>

    {/* Takvimi kapatma butonu */}
    <button
      onClick={closeCalendar}
      className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-500 shadow"
      aria-label="Close calendar"
    >
      <X className="w-5 h-5 text-gray-800" />
    </button>
  </div>
)}


      {/* Tema butonu */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
