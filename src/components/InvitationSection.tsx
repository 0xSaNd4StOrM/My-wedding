import React, { useState } from 'react';
import { weddingConfig } from '../weddingConfig';
import { getGoogleCalendarUrl, downloadIcsFile, shareViaWhatsApp } from '../utils/calendar';
import { Calendar, MapPin, Share2, Check, ExternalLink } from 'lucide-react';

interface InvitationSectionProps {
  id?: string;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ id = "invitation-section" }) => {
  const [copied, setCopied] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const scrollToVenue = () => {
    const venueEl = document.getElementById('venue-section');
    if (venueEl) {
      venueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      className="relative w-full h-full min-h-screen flex items-center justify-center bg-[#fcfaf7] text-[#1a1a1a] px-4 sm:px-6 py-12 sm:py-16 md:py-20 select-none overflow-hidden"
    >
      {/* Subtle paper noise texture */}
      <div className="absolute inset-0 paper-texture opacity-[0.03] pointer-events-none" />

      {/* Subtle radial ambient warmth */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#c5a059]/10 blur-[160px] pointer-events-none" />

      {/* Editorial Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-5 sm:space-y-7 md:space-y-8 w-full py-4">
        
        {/* Basmala & Quranic Verse */}
        <div className="space-y-2 max-w-2xl px-2">
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#c5a059] tracking-wide">
            {weddingConfig.basmala}
          </p>
          <p className="font-editorial text-sm sm:text-base md:text-lg text-[#1a1a1a]/70 font-light leading-relaxed">
            {weddingConfig.quranAyah}
          </p>
        </div>

        {/* Prophetic Du'aa for the couple */}
        <div className="px-4 py-1.5 rounded-full bg-[#c5a059]/8 border border-[#c5a059]/25">
          <p className="font-editorial text-base sm:text-xl md:text-2xl text-[#8c6b32] font-normal tracking-wide">
            {weddingConfig.weddingDua}
          </p>
        </div>

        {/* Fine gold separator */}
        <div className="line-draw opacity-30 my-1 sm:my-2" />

        {/* Formal Invitation Intro */}
        <p className="font-sans-ar text-xs sm:text-sm tracking-[0.2em] text-[#1a1a1a]/60 uppercase max-w-md">
          {weddingConfig.invitationIntro}
        </p>

        {/* Editorial Couple Names */}
        <div className="flex flex-col items-center">
          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#1a1a1a] tracking-wide leading-tight flex items-center justify-center gap-4 sm:gap-8">
            <span>{weddingConfig.groom}</span>
            <span className="text-3xl sm:text-5xl md:text-6xl text-[#c5a059] italic opacity-60 font-editorial">
              &
            </span>
            <span>{weddingConfig.bride}</span>
          </h2>
        </div>

        {/* Warm invitation text */}
        <div className="max-w-xl px-4">
          <p className="font-editorial text-base sm:text-lg md:text-xl text-[#1a1a1a]/85 leading-relaxed font-normal">
            {weddingConfig.invitationText}
          </p>
        </div>

        {/* The Architectural Date Grid */}
        <div className="flex items-center gap-4 sm:gap-12 md:gap-16 border-y border-[#1a1a1a12] py-5 sm:py-7 w-full max-w-2xl justify-center bg-[#fcfaf7]/50 backdrop-blur-xs">
          <div className="text-right">
            <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-1 font-sans-ar">اليوم</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-editorial text-[#1a1a1a]">الخميس</span>
          </div>
          <div className="h-10 sm:h-12 w-[1px] bg-[#c5a05940]" />
          <div className="text-center px-3">
            <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-1 font-sans-ar">سبتمبر</span>
            <span className="text-4xl sm:text-5xl md:text-6xl font-editorial tracking-tighter text-[#1a1a1a]">١٠</span>
          </div>
          <div className="h-10 sm:h-12 w-[1px] bg-[#c5a05940]" />
          <div className="text-left">
            <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-1 font-sans-ar">الساعة</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-editorial text-[#1a1a1a]">٠٧:٠٠ مساءً</span>
          </div>
        </div>

        {/* Venue Line - STRICTLY 'قاعة ليلة العمر' */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] opacity-40 font-sans-ar">
            المكان
          </span>
          <p className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] font-normal tracking-wide">
            {weddingConfig.venue}
          </p>

          {/* PROMINENT DIRECT GOOGLE MAPS BUTTON */}
          <a
            href={weddingConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="فتح في خرائط Google"
            className="mt-2 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#c5a059] hover:bg-[#b08c44] text-white shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 font-sans-ar text-sm sm:text-base font-medium cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-white" />
            <span>فتح في خرائط Google</span>
            <ExternalLink className="w-4 h-4 text-white/85" />
          </a>
        </div>

        {/* Quick UX Actions Bar (Calendar, Map Jump, Share) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-lg">
          {/* Add to Calendar Button with Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#c5a059]/50 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-[#8c6b32] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <span>إضافة إلى التقويم</span>
            </button>

            {calendarOpen && (
              <div className="absolute bottom-full mb-2 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-48 bg-[#ffffff] border border-[#e8dfd3] rounded-xl shadow-lg p-2 z-50 flex flex-col gap-1 text-right">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarOpen(false)}
                  className="px-3 py-2 text-xs text-[#1a1a1a] hover:bg-[#fcfaf7] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>تقويم Google</span>
                  <ExternalLink className="w-3 h-3 text-[#888]" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    downloadIcsFile();
                    setCalendarOpen(false);
                  }}
                  className="px-3 py-2 text-xs text-[#1a1a1a] hover:bg-[#fcfaf7] rounded-lg transition-colors text-right w-full cursor-pointer"
                >
                  تقويم آبل / أوتلوك (.ics)
                </button>
              </div>
            )}
          </div>

          {/* Quick Jump to Venue / Easy Map click */}
          <button
            type="button"
            onClick={scrollToVenue}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#c5a059]" />
            <span>عرض الخريطة التفصيلية</span>
          </button>

          {/* Share via WhatsApp */}
          <button
            type="button"
            onClick={shareViaWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            title="مشاركة عبر واتساب"
          >
            <Share2 className="w-4 h-4 text-[#c5a059]" />
            <span>مشاركة عبر واتساب</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            title="نسخ رابط الدعوة"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">تم النسخ</span>
              </>
            ) : (
              <span>نسخ الرابط</span>
            )}
          </button>
        </div>

        {/* Minimal Scroll Indicator to Map Section */}
        <div 
          onClick={scrollToVenue}
          className="pt-6 sm:pt-8 flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#c5a059] font-sans-ar uppercase mb-1.5">
            اسحب لعرض تفاصيل الموقع والخريطة
          </span>
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-[#c5a059] to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
};
