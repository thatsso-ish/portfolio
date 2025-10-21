import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

// Updated colors for each continent (light/dark)
const continentColors = {
  Africa:   { light: '#333333', dark: '#FFFFFF' },
  Europe:   { light: '#0A3BFF', dark: '#C2CEFF' },
  Asia:     { light: '#00257A', dark: '#709BFF' },
  "North America": { light: '#ffe0e6', dark: '#433142' },
  "South America": { light: '#fee4c3', dark: '#443619' },
  Oceania:  { light: '#e3f7f1', dark: '#0f3633' },
  Antarctica:{ light: '#f7faff', dark: '#232e35' },
  default:  { light: '#e8e8e8', dark: '#222831' },
};

// Section mapping
const continentSections = {
  Africa: 'Hackathons',
  Europe: 'Projects', 
  Asia: 'Contact'
};

// Sample country data for each continent
const continentData = {
  Africa: [
    { country: 'South Africa', projects: ['BCG Platinion Hackathon 2025'] },
    { country: 'Nigeria', projects: ["Bet'25 Software Hackathon"] },
    { country: 'Egypt', projects: ['Geekulcha Annual Hack 2025'] },
    { country: 'Morocco', projects: ['GradHackathon'] },
    { country: 'Cape Verde', projects: ["Foundations' Hackathon"] }
  ],
  Europe: [
    { country: 'France', projects: ['EchoLens Classification'] },
    { country: 'Austria', projects: ['News Article Categorization'] },
    { country: 'Germany', projects: ['Climate Connect'] },
    { country: 'Croatia', projects: ['Hacker News'] },
    { country: 'Italy', projects: ['Heart Failure Model'] },
    { country: 'Spain', projects: ['Cricket Predictive Model'] }
  ],
  Asia: [
    { country: 'Contact Info', projects: ['LinkedIn', 'GitHub', 'Email', 'Phone'] }
  ]
};

// Helper to associate a GeoJSON feature to a continent based on country names
function getContinent(feature) {
  const countryName = feature.properties.NAME || feature.properties.name || feature.properties.ADMIN || feature.properties.admin || '';
  console.log('Country name:', countryName); // Debug log
  
  // Map countries to continents
  const countryToContinent = {
    // Africa
    'South Africa': 'Africa',
    'Nigeria': 'Africa',
    'Egypt': 'Africa',
    'Morocco': 'Africa',
    'Cape Verde': 'Africa',
    
    // Europe
    'Croatia': 'Europe',
    'Italy': 'Europe',
    'Spain': 'Europe',
    'France': 'Europe',
    'Germany': 'Europe',
    'Austria': 'Europe',
    
    // Asia
    'China': 'Asia',
  };
  
  const continent = countryToContinent[countryName];
  console.log('Mapped continent:', continent); // Debug log
  return continent || 'default';
}

export default function GlobeSection({ isDark, onSectionSelect }) {
  const [dark, setDark] = useState(() =>
    typeof isDark === 'boolean' ? isDark : window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const globeRef = useRef();
  const [landPolygons, setLandPolygons] = useState([]);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // Sync with parent-provided dark mode when available
  useEffect(() => {
    if (typeof isDark === 'boolean') {
      setDark(isDark);
    }
  }, [isDark]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        setLandPolygons(data.features);
      });
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = isRotating;
      globeRef.current.controls().autoRotateSpeed = 0.6;
    }
  }, [isRotating]);

  // Polygon color based on continent & dark mode
  const polygonCapColor = (feat) => {
    const cont = getContinent(feat);
    return dark ? continentColors[cont].dark : continentColors[cont].light;
  };

  const polygonStrokeColor = (feat) => (
    hoveredContinent && getContinent(feat) === hoveredContinent ? '#3a7afe' : '#666c'
  );

  const polygonAltitude = (feat) => (
    hoveredContinent && getContinent(feat) === hoveredContinent ? 0.056 : 0.012
  );

  // Handle continent hover
  const handlePolygonHover = (feat) => {
    console.log('Polygon hover:', feat); // Debug log
    if (feat) {
      const continent = getContinent(feat);
      console.log('Detected continent:', continent); // Debug log
      if (continentSections[continent]) {
        setHoveredContinent(continent);
        setIsRotating(false); // Stop rotation on hover
      }
    } else {
      setHoveredContinent(null);
      setIsRotating(true); // Resume rotation when not hovering
    }
  };

  // Handle continent click
  const handleContinentClick = (continent) => {
    console.log('Continent clicked:', continent); // Debug log
    if (continentSections[continent] && onSectionSelect) {
      console.log('Navigating to:', continentSections[continent]); // Debug log
      onSectionSelect(continentSections[continent]);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
        <Globe
          ref={globeRef}
          width={window.innerWidth}
          height={window.innerHeight}
          backgroundColor={dark ? '#20212b' : '#f5f7fa'}
          globeColor={dark ? '#232334' : '#e6edfa'}
          showGraticules={true}
          pointOfView={{lat:10, lng:20, altitude:2.2}}
          polygonsData={landPolygons}
          polygonCapColor={polygonCapColor}
          polygonSideColor={() => 'rgba(60,90,180, 0.12)'}
          polygonStrokeColor={polygonStrokeColor}
          polygonAltitude={polygonAltitude}
          polygonsTransitionDuration={350}
          onPolygonHover={handlePolygonHover}
          onPolygonClick={(feat) => {
            console.log('Polygon clicked:', feat); // Debug log
            if (feat) {
              const continent = getContinent(feat);
              handleContinentClick(continent);
            }
          }}
        />
      </div>
      {/* Continent popup on hover */}
      {hoveredContinent && continentSections[hoveredContinent] && (
        <div className="absolute bottom-4 sm:bottom-8 lg:bottom-20 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-brand-dark border-2 border-brand-blue/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-2xl max-w-xs sm:max-w-sm lg:max-w-md mx-4 animate-fade-in">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-blue mb-1 sm:mb-2">{continentSections[hoveredContinent]}</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Click continent to navigate</p>
          </div>
          <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-48 lg:max-h-60 overflow-y-auto">
            {continentData[hoveredContinent]?.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                <h4 className="font-semibold text-brand-blue text-xs sm:text-sm mb-1">{item.country}</h4>
                <div className="flex flex-wrap gap-1">
                  {item.projects.map((project, pIdx) => (
                    <span key={pIdx} className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-1 rounded-full">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
