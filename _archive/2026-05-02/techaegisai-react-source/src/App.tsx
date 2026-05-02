import Index from './pages/Index';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import LiveAgentSection from './components/LiveAgentSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import BookCallSection from './components/BookCallSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black text-white">
      <Index />
      <AboutSection />
      <FeaturedVideoSection />
      <LiveAgentSection />
      <PhilosophySection />
      <ServicesSection />
      <BookCallSection />
      <Footer />
    </div>
  );
}
