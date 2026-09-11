import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import SelectedWork from '@/components/SelectedWork';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-ink-bg">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <SelectedWork />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}

export default App;
