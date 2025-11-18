import GlobeSection from './GlobeSection';
import ProjectCards from './ProjectCards';
import ContactSection from './ContactSection';
import HackathonCards from './HackathonCards';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [dark, setDark] = useState(() => false);
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
          <div className="w-full min-h-screen flex flex-col items-center px-2 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-16">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 text-brand-blue text-center">Projects</h1>
            <ProjectCards />
          </div>
        );
      case 'hackathons':
        return (
          <div className="w-full min-h-screen flex flex-col items-center px-2 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-16">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 text-brand-blue text-center">Seasonal Tech Competitions</h1>
            <HackathonCards />
          </div>
        );
      case 'contact':
        return (
          <div className="w-full min-h-screen flex flex-col items-center px-2 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-16">
            <ContactSection />
          </div>
        );
      default:
        return <GlobeSection onSectionSelect={scrollToSection} isDark={dark} />;
    }
  };

  return (
    <div className="min-h-screen min-h-[320px] w-full flex bg-brand-light dark:bg-brand-dark text-brand-gray-900 dark:text-gray-100 transition-bg">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigation} 
        dark={dark} 
        setDark={setDark} 
      />
      <main className="flex-1 ml-0 sm:ml-16 w-full min-h-[320px]">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
