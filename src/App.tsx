import { useLayoutEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import Achievements from '@/components/Achievements';
import About from '@/components/About';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import Contact from '@/components/Contact';
import IntroOverlay from '@/components/IntroOverlay';
import CustomCursor from '@/components/CustomCursor';

function App() {
  useLayoutEffect(() => {
    // Disable browser scroll restoration to ensure page always starts at top on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on mount - this ensures reload starts at top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-ink-bg">
      <CustomCursor />
      <IntroOverlay />
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Achievements />
        <About />
        <Skills />
        <GitHubActivity />
        <Contact />
      </main>
    </div>
  );
}

export default App;

