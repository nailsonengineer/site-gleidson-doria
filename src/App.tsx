import { useState, useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { LandingProfile } from './components/LandingProfile/LandingProfile';
import { ModalProvider } from './context/ModalContext';

export function App() {
  const [inSite, setInSite] = useState<boolean>(() => {
    return sessionStorage.getItem('gleidson_entered_site') === 'true';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [inSite]);

  const handleEnterSite = () => {
    sessionStorage.setItem('gleidson_entered_site', 'true');
    setInSite(true);
  };

  const handleOpenAbout = () => {
    sessionStorage.setItem('gleidson_entered_site', 'true');
    setInSite(true);
    setTimeout(() => {
      const aboutElement = document.getElementById('sobre');
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <ModalProvider>
      <div className="relative min-h-screen w-full bg-black">
        {!inSite ? (
          <LandingProfile
            onEnterSite={handleEnterSite}
            onOpenAbout={handleOpenAbout}
          />
        ) : (
          <Home />
        )}
      </div>
    </ModalProvider>
  );
}

export default App;