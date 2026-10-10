import { Hero } from '@/components/sections/Hero';
import { WorldsSection } from '@/components/sections/WorldsSection';
import { JourneyTrail } from '@/components/sections/JourneyTrail';
import { Countdown } from '@/components/sections/Countdown';
import { SponsorsMarquee } from '@/components/sections/SponsorsMarquee';
import { Finale } from '@/components/sections/Finale';

export default function Home() {
  return (
    <>
      <Hero />
      <WorldsSection />
      <JourneyTrail />
      <Countdown />
      <SponsorsMarquee />
      <Finale />
    </>
  );
}
