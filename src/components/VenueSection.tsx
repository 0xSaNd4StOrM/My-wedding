import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../weddingConfig';
import { MapPin, Navigation, ExternalLink, Copy, Check, Share2, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VenueSectionProps {
  id?: string;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ id = "venue-section" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pinPointRef = useRef<SVGGElement>(null);
  const venueTitleRef = useRef<HTMLDivElement>(null);
  const finalNamesRef = useRef<HTMLDivElement>(null);
  const mapLinesRef = useRef<SVGGElement>(null);

  const [copied, setCopied] = useState(false);

  const handleCopyLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(weddingConfig.mapsUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const handleShareLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `موقع حفل زفاف ${weddingConfig.groom} و ${weddingConfig.bride}: ${weddingConfig.venue}\nرابط خرائط Google: ${weddingConfig.mapsUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Set initial path state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // ScrollTrigger timeline for the venue graphic drawing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 1.2,
        },
      });

      tl.to(mapLinesRef.current, {
        opacity: 0.45,
        duration: 0.6,
        ease: 'power1.out',
      })
      .to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        duration: 2,
      })
      .to(pinPointRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
      }, '-=0.2')
      .fromTo(
        venueTitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
        '+=0.1'
      )
      .fromTo(
        finalNamesRef.current,
        { opacity: 0, y: 25, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
        '+=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#fcfaf7] text-[#1a1a1a] px-4 sm:px-6 py-20 sm:py-28 select-none overflow-hidden"
    >
      {/* Subtle paper noise texture */}
      <div className="absolute inset-0 paper-texture opacity-[0.03] pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-[180px] pointer-events-none" />

      {/* Main Venue Storytelling Content */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center space-y-8 sm:space-y-10">

        {/* Initial Venue Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-transparent via-[#c5a059] to-transparent mb-2" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] opacity-40 font-sans-ar">
            الموقع الجغرافي
          </span>
          {/* Strictly: قاعة ليلة العمر */}
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a] font-normal tracking-wide">
            {weddingConfig.venue}
          </h2>
        </div>

        {/* Interactive Clickable Map Card */}
        <div 
          onClick={() => window.open(weddingConfig.mapsUrl, '_blank', 'noopener,noreferrer')}
          title="انقر لفتح الموقع في خرائط Google"
          className="group relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#ffffff]/60 backdrop-blur-md p-4 shadow-sm hover:shadow-xl hover:border-[#c5a059] transition-all duration-500 cursor-pointer overflow-hidden"
        >
          {/* Direct click badge overlay */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1a1a]/5 group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300 text-[11px] font-sans-ar">
            <Navigation className="w-3 h-3 text-[#c5a059] group-hover:text-white" />
            <span>انقر للملاحة</span>
          </div>

          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
          >
            {/* Fine architectural coordinate grid & concentric reference circles */}
            <g ref={mapLinesRef} className="opacity-0 transition-opacity duration-700">
              {/* Subtle crosshairs */}
              <line x1="20" y1="150" x2="380" y2="150" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" />
              <line x1="200" y1="20" x2="200" y2="280" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" />
              
              {/* Concentric distance halos around venue */}
              <circle cx="200" cy="140" r="40" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
              <circle cx="200" cy="140" r="80" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" />
              <circle cx="200" cy="140" r="120" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15" />

              {/* Minimalist geographic coordinate text */}
              <text x="25" y="142" fill="#1a1a1a" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="1">29° 57&apos; N</text>
              <text x="195" y="275" fill="#1a1a1a" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="1" textAnchor="middle">31° 10&apos; E</text>
            </g>

            {/* Cinematic Scroll-Drawn Destination Path */}
            <path
              ref={pathRef}
              d="M 50 250 C 90 230, 110 180, 140 190 C 170 200, 160 150, 200 140"
              stroke="#c5a059"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Target Venue Pinpoint */}
            <g
              ref={pinPointRef}
              transform="translate(200, 140)"
              className="opacity-0"
              style={{ transformOrigin: '200px 140px' }}
            >
              {/* Outer pulsing ring */}
              <circle cx="0" cy="0" r="16" stroke="#c5a059" strokeWidth="0.75" className="animate-ping opacity-35" />
              {/* Subtle radiant aura */}
              <circle cx="0" cy="0" r="9" fill="#c5a059" fillOpacity="0.2" />
              {/* Solid pinpoint core */}
              <circle cx="0" cy="0" r="4" fill="#1a1a1a" />
              <circle cx="0" cy="0" r="1.8" fill="#c5a059" />
            </g>
          </svg>
        </div>

        {/* PROMINENT HIGH-CLICKABILITY ACTION BUTTONS */}
        <div ref={venueTitleRef} className="space-y-4 opacity-0 flex flex-col items-center w-full">
          {/* Main Direct Google Maps Button */}
          <a
            href={weddingConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="فتح في خرائط Google"
            className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#c5a059] hover:bg-[#b08c44] text-white shadow-md hover:shadow-xl active:scale-98 transition-all duration-300 font-sans-ar text-base sm:text-lg font-medium cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-white" />
            <span>فتح في خرائط Google</span>
            <ExternalLink className="w-4 h-4 text-white/80" />
          </a>

          {/* Secondary Action Buttons (Copy Link, Share) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleCopyLocation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-xs focus:outline-none"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">تم نسخ رابط الموقع</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#c5a059]" />
                  <span>نسخ رابط الموقع</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareLocation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-xs focus:outline-none"
            >
              <Share2 className="w-4 h-4 text-[#c5a059]" />
              <span>مشاركة الموقع</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#1a1a1a]/60 font-sans-ar pt-1">
            انقر على الزر أعلاه للبدء في الملاحة المباشرة نحو القاعة
          </p>
        </div>

        {/* Quiet whitespace pause, Prophetic Du'aa, & Final Couple Seal */}
        <div className="pt-16 sm:pt-24 pb-8 flex flex-col items-center w-full">
          <div className="w-12 h-[1px] bg-[#c5a059]/40 mb-10" />

          {/* Final Seal Content */}
          <div ref={finalNamesRef} className="opacity-0 space-y-4 max-w-lg px-4">
            {/* Du'aa at the end */}
            <p className="font-editorial text-lg sm:text-2xl text-[#c5a059] font-normal tracking-wide">
              {weddingConfig.weddingDua}
            </p>

            {/* At the very end: حسام & آلاء */}
            <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#1a1a1a] font-normal tracking-wide">
              <span>{weddingConfig.groom}</span>
              <span className="mx-3 sm:mx-4 font-editorial text-2xl sm:text-4xl text-[#c5a059] italic opacity-60">
                &
              </span>
              <span>{weddingConfig.bride}</span>
            </h3>

            {/* Return to Top button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-[#1a1a1a]/50 hover:text-[#c5a059] hover:bg-[#1a1a1a]/5 transition-all duration-300 font-sans-ar focus:outline-none"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>العودة إلى البداية</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
