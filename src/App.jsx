import GlobeSection from './GlobeSection';
import ProjectCards from './ProjectCards';
import ContactSection from './ContactSection';
import HackathonCards from './HackathonCards';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [currentPage, setCurrentPage] = useState('globe');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const scrollToSection = (sectionName) => {
    // Navigate to the appropriate page
    const pageMap = {
      'Projects': 'projects',
      'Hackathons': 'hackathons', 
      'Contact': 'contact'
    };
    const pageId = pageMap[sectionName];
    if (pageId) {
      setCurrentPage(pageId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'globe':
        return <GlobeSection onSectionSelect={scrollToSection} isDark={dark} />;
      case 'projects':
        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-brand-blue">Projects</h1>
            <ProjectCards />
          </div>
        );
      case 'hackathons':
        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-brand-blue">Seasonal Tech Competitions</h1>
            <HackathonCards />
          </div>
        );
      case 'contact':
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <ContactSection />
          </div>
        );
      default:
        return <GlobeSection onSectionSelect={scrollToSection} isDark={dark} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-brand-light dark:bg-brand-dark text-brand-gray-900 dark:text-gray-100 transition-bg">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigation} 
        dark={dark} 
        setDark={setDark} 
      />
      <main className="flex-1 ml-12 sm:ml-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
