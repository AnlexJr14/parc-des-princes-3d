// App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { articleData, creatorsData } from './data';
import AudioToggle from './components/AudioToggle';

export default function App() {
  const [view, setView] = useState('map');

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#E30613]/10 flex flex-col">
      <AudioToggle />

      <Navbar currentView={view} setView={setView} />

      <main className="grow">
        <MainContent
          view={view}
          setView={setView}
          articleData={articleData}
          creatorsData={creatorsData}
        />
      </main>

      <Footer setView={setView} />
    </div>
  );
}