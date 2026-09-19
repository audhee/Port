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

// Scroll restoration is handled in main.tsx before React mounts.

function App() {
  return (
    <div className="min-h-screen bg-bg">
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
