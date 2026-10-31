import React, { useState } from 'react';
import { weddingConfig, WeddingEventItem } from '../weddingConfig';
import { getGoogleCalendarUrl, downloadIcsFile, shareViaWhatsApp } from '../utils/calendar';
import { Calendar, MapPin, Share2, Check, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';

interface InvitationSectionProps {
  id?: string;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ id = "invitation-section" }) => {
  const [copied, setCopied] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<WeddingEventItem | undefined>(undefined);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const scrollToVenuesGuide = () => {
    const venueEl = document.getElementById('venue-section');
    if (venueEl) {
      venueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      className="relative w-full min-h-screen flex items-center justify-center bg-[#fcfaf7] text-[#1a1a1a] px-3.5 sm:px-6 py-12 sm:py-16 md:py-24 select-none overflow-hidden"
    >
      {/* Subtle paper noise texture */}
      <div className="absolute inset-0 paper-texture opacity-[0.03] pointer-events-none" />

      {/* Subtle radial ambient warmth */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#c5a059]/10 blur-[160px] pointer-events-none" />

      {/* Editorial Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10 w-full py-4">
        
        {/* Basmala & Doves */}
        <div className="space-y-3 max-w-2xl px-2">
          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#c5a059] tracking-wider leading-relaxed">
            {weddingConfig.basmala}
          </p>
          <div className="space-y-1">
            <p className="font-editorial text-sm sm:text-base md:text-lg text-[#1a1a1a]/75 font-light leading-relaxed">
              {weddingConfig.quranAyah}
            </p>
            <span className="inline-block text-[11px] sm:text-xs text-[#c5a059] font-sans-ar opacity-85">
              {weddingConfig.quranSurah}
            </span>
          </div>
        </div>

        {/* Poetic Couplet Box - Classical Wedding Poetry */}
        <div className="relative max-w-xl mx-auto w-full px-5 py-4 sm:py-5 rounded-2xl bg-gradient-to-b from-[#ffffff]/90 to-[#fcfaf7]/90 border border-[#c5a059]/35 shadow-[0_4px_25px_rgba(197,160,89,0.08)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#fcfaf7] border border-[#c5a059]/30 text-[10px] sm:text-[11px] font-sans-ar text-[#8c6b32] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>فَـرْحَــتُـنَـا</span>
          </div>
          <p className="font-editorial text-base sm:text-xl md:text-2xl text-[#1a1a1a] font-normal leading-loose tracking-wide pt-1">
            {weddingConfig.poetryLine1}
          </p>
          <p className="font-editorial text-base sm:text-xl md:text-2xl text-[#8c6b32] font-normal leading-loose tracking-wide">
            {weddingConfig.poetryLine2}
          </p>
        </div>

        {/* Prophetic Du'aa for the couple */}
        <div className="px-5 py-2 rounded-full bg-[#c5a059]/8 border border-[#c5a059]/25 shadow-xs">
          <p className="font-editorial text-sm sm:text-lg md:text-xl text-[#8c6b32] font-normal tracking-wide">
            {weddingConfig.weddingDua}
          </p>
        </div>

        {/* Formal Invitation Intro */}
        <div className="space-y-1">
          <p className="font-sans-ar text-xs sm:text-sm tracking-[0.25em] text-[#1a1a1a]/60 uppercase">
            {weddingConfig.invitationIntro}
          </p>
          <p className="font-editorial text-lg sm:text-2xl text-[#c5a059] font-normal">
            {weddingConfig.invitationSub}
          </p>
        </div>

        {/* Editorial Couple & Family Names */}
        <div className="flex flex-col items-center space-y-3 py-2 w-full">
          {/* Groom Full Name */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] opacity-40 font-sans-ar mb-1">
              العريس
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#1a1a1a] font-normal tracking-wide leading-tight">
              {weddingConfig.groomFullName}
            </h2>
          </div>

          {/* Golden Ring Emblem */}
          <div className="flex items-center gap-3 my-1">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />
            <span className="text-2xl sm:text-3xl text-[#c5a059] animate-pulse" title="زواج مبارك">
              💍
            </span>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />
          </div>

          {/* Bride Full Name */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] opacity-40 font-sans-ar mb-1">
              العروس
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#1a1a1a] font-normal tracking-wide leading-tight">
              {weddingConfig.brideFullName}
            </h2>
          </div>
        </div>

        {/* Warm invitation text */}
        <div className="max-w-xl px-4">
          <p className="font-editorial text-sm sm:text-base md:text-lg text-[#1a1a1a]/85 leading-relaxed font-normal">
            {weddingConfig.invitationText}
          </p>
        </div>

        {/* Grand Wedding Highlight Banner - جزيرة المعادي (الثلاثاء 10 / 11) */}
        <div className="w-full max-w-2xl rounded-2xl border border-[#c5a059]/40 bg-gradient-to-b from-[#ffffff] to-[#faf6ef] p-5 sm:p-7 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#c5a059]/15 text-[#8c6b32] text-xs font-sans-ar font-medium">
              حَــفْــلُ الــزِّفَــافِ وَالـسِّـيـشِـن • الحفل الرئيسي
            </span>

            <div className="flex items-center gap-4 sm:gap-10 border-y border-[#1a1a1a15] py-4 w-full justify-center">
              <div className="text-right">
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 font-sans-ar">اليوم</span>
                <span className="text-lg sm:text-2xl font-editorial text-[#1a1a1a]">الثلاثاء</span>
              </div>
              <div className="h-8 sm:h-10 w-[1px] bg-[#c5a05940]" />
              <div className="text-center px-2">
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 font-sans-ar">التاريخ</span>
                <span className="text-2xl sm:text-4xl font-editorial tracking-tight text-[#1a1a1a]">10 / 11</span>
              </div>
              <div className="h-8 sm:h-10 w-[1px] bg-[#c5a05940]" />
              <div className="text-left">
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 font-sans-ar">المكان</span>
                <span className="text-lg sm:text-2xl font-editorial text-[#1a1a1a]">جَزِيرَةُ الْمَعَادِي</span>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button for Main Wedding */}
            <a
              href={weddingConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="فتح جزيرة المعادي في خرائط Google"
              className="mt-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#c5a059] hover:bg-[#b08c44] text-white shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 font-sans-ar text-sm sm:text-base font-medium cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-white" />
              <span>فتح جزيرة المعادي في خرائط Google</span>
              <ExternalLink className="w-4 h-4 text-white/85" />
            </a>
          </div>
        </div>

        {/* Multi-Event Itinerary Quick Cards */}
        <div className="w-full max-w-3xl pt-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-[#c5a059]/40" />
            <h3 className="font-editorial text-xl sm:text-2xl text-[#1a1a1a] font-normal tracking-wide">
              بَـرْنَـامَـجُ الاحْـتِـفَـالاتِ وَالـمُـنَـاسَـبَـاتِ
            </h3>
            <div className="h-[1px] w-12 bg-[#c5a059]/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-right">
            {weddingConfig.events.map((evt, idx) => (
              <div
                key={evt.id}
                className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between ${
                  evt.isMain
                    ? 'border-[#c5a059] bg-[#ffffff] shadow-md'
                    : 'border-[#1a1a1a]/10 bg-[#ffffff]/70 hover:border-[#c5a059]/40 hover:bg-[#ffffff]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-sans-ar px-2.5 py-0.5 rounded-full bg-[#c5a059]/10 text-[#8c6b32] font-medium">
                      {evt.tag}
                    </span>
                    <span className="text-xs text-[#1a1a1a]/50 font-sans-ar">
                      {idx + 1} من 4
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg sm:text-xl text-[#1a1a1a] font-normal mb-1">
                    {evt.title}
                  </h4>

                  <div className="space-y-1 text-xs text-[#1a1a1a]/75 font-sans-ar mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#c5a059] font-medium">اليوم والـتاريخ:</span>
                      <span className="font-medium text-[#1a1a1a]">{evt.dayAndDate}</span>
                      {evt.time && <span className="text-[#1a1a1a]/60">({evt.time})</span>}
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#c5a059] font-medium shrink-0">الـمَـــكَــــان:</span>
                      <span className="leading-relaxed">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Event Actions: Map Button if applicable */}
                <div className="pt-2 border-t border-[#1a1a1a]/5 flex items-center justify-between gap-2 mt-auto">
                  {evt.mapsUrl ? (
                    <a
                      href={evt.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#8c6b32] hover:text-white transition-colors duration-200 text-xs font-sans-ar cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>فتح الخريطة</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-[#1a1a1a]/45 font-sans-ar">
                      مرحباً بكم في المنزل
                    </span>
                  )}

                  <a
                    href={getGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#8c6b32] hover:underline flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>تذكير بالتقويم</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick UX Actions Bar (Calendar, Map Jump, Share) */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-lg">
          {/* Add to Calendar Button with Multi-event Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#c5a059]/50 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-[#8c6b32] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <span>إضافة المناسبات للتقويم</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {calendarOpen && (
              <div className="absolute bottom-full mb-2 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-64 bg-[#ffffff] border border-[#e8dfd3] rounded-xl shadow-xl p-2.5 z-50 flex flex-col gap-1 text-right">
                <span className="text-[11px] font-sans-ar text-[#8c6b32] px-2 py-1 font-medium border-b border-[#1a1a1a]/5">
                  اختر المناسبة لإضافتها للتقويم:
                </span>
                {weddingConfig.events.map((evt) => (
                  <a
                    key={evt.id}
                    href={getGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCalendarOpen(false)}
                    className="px-2.5 py-1.5 text-xs text-[#1a1a1a] hover:bg-[#fcfaf7] rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <span className="font-sans-ar group-hover:text-[#c5a059]">{evt.title} ({evt.dayNumber} نوفمبر)</span>
                    <ExternalLink className="w-3 h-3 text-[#888] opacity-60" />
                  </a>
                ))}
                <div className="pt-1.5 border-t border-[#1a1a1a]/5">
                  <button
                    type="button"
                    onClick={() => {
                      downloadIcsFile();
                      setCalendarOpen(false);
                    }}
                    className="px-2.5 py-1 text-xs text-[#8c6b32] hover:bg-[#fcfaf7] rounded-lg transition-colors text-right w-full cursor-pointer font-sans-ar"
                  >
                    تحميل ملف التقويم العام (.ics)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Jump to Venue / Detailed Map Guide */}
          <button
            type="button"
            onClick={scrollToVenuesGuide}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#c5a059]" />
            <span>دليل المواقع والخرائط</span>
          </button>

          {/* Share via WhatsApp */}
          <button
            type="button"
            onClick={shareViaWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1a1a1a]/15 bg-[#ffffff] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs sm:text-sm font-sans-ar transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            title="مشاركة تفاصيل الدعوة عبر واتساب"
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
          onClick={scrollToVenuesGuide}
          className="pt-6 sm:pt-8 flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#c5a059] font-sans-ar uppercase mb-1.5">
            اسحب لعرض تفاصيل المواقع والخرائط
          </span>
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-[#c5a059] to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
};
