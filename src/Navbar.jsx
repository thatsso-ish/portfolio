import React, { useState } from 'react';

export default function Navbar({ currentPage, onNavigate, dark, setDark }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'globe', label: 'Globe', icon: '🌍', showOnlyOnPages: ['projects', 'hackathons', 'contact'] }
  ];

  const handleItemClick = (itemId) => {
    onNavigate(itemId);
    setIsExpanded(false);
  };

  return (
    <nav 
      className={`fixed left-0 top-0 h-full w-12 sm:w-16 bg-white dark:bg-brand-dark border-r border-brand-gray-200 dark:border-brand-gray-900 transition-all duration-300 z-50 ${
        isExpanded ? 'w-48 sm:w-64' : 'w-12 sm:w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header with name (only on landing page) */}
        {currentPage === 'globe' && (
          <div className="p-2 sm:p-4 border-b border-brand-gray-200 dark:border-brand-gray-900">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                IN
              </div>
              {isExpanded && (
                <div className="text-xs sm:text-sm font-semibold text-brand-gray-900 dark:text-gray-100">
                  Ishmael Ngobeni
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 py-2 sm:py-4">
          {navItems.map((item) => {
            // Show globe icon only on specific pages, hide other icons on all pages
            const shouldShowItem = item.id === 'globe' 
              ? item.showOnlyOnPages.includes(currentPage)
              : false;
            
            if (!shouldShowItem) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 text-left transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-brand-blue/10 text-brand-blue border-r-2 border-brand-blue'
                    : 'text-brand-gray-600 dark:text-gray-400 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-800'
                }`}
              >
                <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                {isExpanded && (
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dark/Light Mode Toggle */}
        <div className="p-2 sm:p-4 border-t border-brand-gray-200 dark:border-brand-gray-900">
          <button
            className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 text-left text-brand-gray-600 dark:text-gray-400 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-800 transition-colors duration-200"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
                {isExpanded && <span className="text-xs sm:text-sm font-medium">Dark Mode</span>}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.06 6.06l-1.42-1.42M6.34 6.34 4.93 4.93m12.02 0-1.42 1.42M6.34 17.66l-1.41 1.41" />
                </svg>
                {isExpanded && <span className="text-xs sm:text-sm font-medium">Light Mode</span>}
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
