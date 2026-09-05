import React from 'react';
import { CurtainIntro } from './CurtainIntro';
import { VenueSection } from './VenueSection';

export const ScrollExperience: React.FC = () => {
  return (
    <div
      id="scroll-experience-root"
      className="relative w-full bg-[#fcfaf7] text-[#1a1a1a] overflow-x-hidden"
    >
      {/* MERGED SECTION 1 & 2: THE CURTAIN OPENING & WEDDING INVITATION */}
      <section id="invitation-hero" className="relative w-full min-h-screen">
        <CurtainIntro />
      </section>

      {/* SECTION 2 (VENUE): MAP, JOURNEY & FINAL BLESSING */}
      <section id="venue-section" className="relative w-full z-20">
        <VenueSection />
      </section>
    </div>
  );
};
