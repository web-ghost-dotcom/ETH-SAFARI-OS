import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import CoreLayers from '@/components/CoreLayers';
import EcosystemFlow from '@/components/EcosystemFlow';
import Vision from '@/components/Vision';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div id="mission">
          <Mission />
        </div>
        <div id="layers">
          <CoreLayers />
        </div>
        <div id="ecosystem">
          <EcosystemFlow />
        </div>
        <div id="vision">
          <Vision />
        </div>
      </main>
      <Footer />
    </div>
  );
}
