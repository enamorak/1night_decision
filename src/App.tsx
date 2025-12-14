import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export type Page = 'landing' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onNavigateHome={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}
