import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { articleData, creatorsData } from './data';

export default function App() {
  const [view, setView] = useState('map');

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#E30613]/10 flex flex-col">

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

      <Analytics />
    </div>
  );
}