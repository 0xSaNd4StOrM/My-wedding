import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig, WeddingEventItem } from '../weddingConfig';
import { MapPin, Navigation, ExternalLink, Copy, Check, Share2, ArrowUp, Compass } from 'lucide-react';

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

  // Default to main wedding (جزيرة المعادي)
  const [selectedEventId, setSelectedEventId] = useState<string>("wedding-party");
  const [copied, setCopied] = useState(false);

  const currentEvent: WeddingEventItem =
    weddingConfig.events.find((e) => e.id === selectedEventId) || weddingConfig.events[3];

  const handleCopyLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = currentEvent.mapsUrl || window.location.href;
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const handleShareLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `موقع ${currentEvent.title}: ${currentEvent.venue}\nالموعد: ${currentEvent.dayAndDate} (${currentEvent.time})${currentEvent.mapsUrl ? '\nرابط خرائط Google: ' + currentEvent.mapsUrl : ''}`;
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
        opacity: 0.5,
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

      {/* Main Storytelling Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center space-y-8 sm:space-y-10">

        {/* Section Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-transparent via-[#c5a059] to-transparent mb-2" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] opacity-40 font-sans-ar flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>دليل المواقع والخرائط</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1a1a1a] font-normal tracking-wide">
            خريطة الوصول والملاحة
          </h2>
          <p className="text-xs sm:text-sm text-[#1a1a1a]/60 font-sans-ar max-w-md">
            اختر المناسبة من التبويبات أدناه لعرض تفاصيل الموقع ورابط خرائط Google المباشر
          </p>
        </div>

        {/* Interactive Event Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 max-w-xl w-full">
          {weddingConfig.events.map((evt) => (
            <button
              key={evt.id}
              type="button"
              onClick={() => setSelectedEventId(evt.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans-ar transition-all duration-300 cursor-pointer flex-1 min-w-[120px] ${
                selectedEventId === evt.id
                  ? 'bg-[#ffffff] text-[#8c6b32] shadow-sm font-medium border border-[#c5a059]/40'
                  : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#ffffff]/50'
              }`}
            >
              <span>{evt.title}</span>
            </button>
          ))}
        </div>

        {/* Active Venue Details Card */}
        <div className="space-y-2 max-w-lg">
          <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-sans-ar">
            {currentEvent.tag} • {currentEvent.dayAndDate}
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl text-[#1a1a1a] font-normal">
            {currentEvent.venue}
          </h3>
          {currentEvent.time && (
            <p className="text-xs sm:text-sm text-[#1a1a1a]/60 font-sans-ar">
              الموعد: {currentEvent.time}
            </p>
          )}
        </div>

        {/* Interactive Clickable Map Visual */}
        <div 
          onClick={() => currentEvent.mapsUrl && window.open(currentEvent.mapsUrl, '_blank', 'noopener,noreferrer')}
          title={currentEvent.mapsUrl ? "انقر لفتح الموقع في خرائط Google" : "الموقع في المنزل"}
          className={`group relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center rounded-2xl border bg-[#ffffff]/60 backdrop-blur-md p-4 shadow-sm transition-all duration-500 overflow-hidden ${
            currentEvent.mapsUrl
              ? 'border-[#c5a059]/40 hover:shadow-xl hover:border-[#c5a059] cursor-pointer'
              : 'border-[#1a1a1a]/15 cursor-default'
          }`}
        >
          {/* Navigation badge */}
          {currentEvent.mapsUrl ? (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1a1a]/5 group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300 text-[11px] font-sans-ar">
              <Navigation className="w-3 h-3 text-[#c5a059] group-hover:text-white" />
              <span>انقر للملاحة</span>
            </div>
          ) : (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1a1a]/5 text-[11px] font-sans-ar text-[#8c6b32]">
              <span>ضيافة في المنزل</span>
            </div>
          )}

          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
          >
            {/* Fine architectural coordinate grid & concentric reference circles */}
            <g ref={mapLinesRef} className="opacity-0 transition-opacity duration-700">
              <line x1="20" y1="150" x2="380" y2="150" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" />
              <line x1="200" y1="20" x2="200" y2="280" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" />
              
              <circle cx="200" cy="140" r="40" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
              <circle cx="200" cy="140" r="80" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" />
              <circle cx="200" cy="140" r="120" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15" />

              <text x="25" y="142" fill="#1a1a1a" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="1">29° 58&apos; N</text>
              <text x="195" y="275" fill="#1a1a1a" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="1" textAnchor="middle">31° 16&apos; E</text>
            </g>

            {/* Destination Path */}
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
              <circle cx="0" cy="0" r="16" stroke="#c5a059" strokeWidth="0.75" className="animate-ping opacity-35" />
              <circle cx="0" cy="0" r="9" fill="#c5a059" fillOpacity="0.2" />
              <circle cx="0" cy="0" r="4" fill="#1a1a1a" />
              <circle cx="0" cy="0" r="1.8" fill="#c5a059" />
            </g>
          </svg>
        </div>

        {/* Action Buttons for Current Venue */}
        <div ref={venueTitleRef} className="space-y-3 opacity-0 flex flex-col items-center w-full">
          {currentEvent.mapsUrl ? (
            <a
              href={currentEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`فتح ${currentEvent.venue} في خرائط Google`}
              className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#c5a059] hover:bg-[#b08c44] text-white shadow-md hover:shadow-xl active:scale-98 transition-all duration-300 font-sans-ar text-sm sm:text-base font-medium cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-white" />
              <span>فتح الموقع في خرائط Google</span>
              <ExternalLink className="w-4 h-4 text-white/80" />
            </a>
          ) : (
            <div className="px-6 py-3 rounded-full bg-[#1a1a1a]/5 text-xs sm:text-sm font-sans-ar text-[#1a1a1a]/70">
              مرحب بكم جميعاً في المنزل لمشاركتنا فرحتنا
            </div>
          )}

          {/* Secondary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            {currentEvent.mapsUrl && (
              <button
                type="button"
                onClick={handleCopyLocation}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs font-sans-ar transition-all duration-300 shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>نسخ رابط الموقع</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleShareLocation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs font-sans-ar transition-all duration-300 shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>مشاركة هذا الموقع</span>
            </button>
          </div>
        </div>

        {/* Quiet whitespace pause, Prophetic Du'aa, & Final Couple Seal */}
        <div className="pt-16 sm:pt-20 pb-8 flex flex-col items-center w-full">
          <div className="w-12 h-[1px] bg-[#c5a059]/40 mb-8" />

          {/* Final Seal Content */}
          <div ref={finalNamesRef} className="opacity-0 space-y-4 max-w-lg px-4 text-center">
            <p className="font-editorial text-base sm:text-xl text-[#c5a059] font-normal tracking-wide">
              {weddingConfig.weddingDua}
            </p>

            {/* Couple Final Names */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest text-[#1a1a1a]/40 font-sans-ar">
                بحضوركم تكتمل بهجتنا
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#1a1a1a] font-normal tracking-wide">
                <span>{weddingConfig.groomFullName}</span>
              </h3>
              <span className="text-xl text-[#c5a059] my-0.5">💍</span>
              <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#1a1a1a] font-normal tracking-wide">
                <span>{weddingConfig.brideFullName}</span>
              </h3>
            </div>

            {/* Return to Top button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs text-[#1a1a1a]/60 hover:text-[#c5a059] bg-[#ffffff] border border-[#1a1a1a]/10 hover:border-[#c5a059]/40 transition-all duration-300 font-sans-ar cursor-pointer shadow-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>العودة إلى بداية الدعوة</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
