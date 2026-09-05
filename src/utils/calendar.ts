import { weddingConfig } from '../weddingConfig';

/**
 * Generates a Google Calendar add event URL for the wedding
 */
export function getGoogleCalendarUrl(): string {
  const title = `حفل زفاف ${weddingConfig.groom} و ${weddingConfig.bride}`;
  // 2026-09-10 from 19:00 to 23:59 UTC+3 (Cairo/Amman/Riyadh time approx)
  const startTime = '20260910T190000';
  const endTime = '20260910T235900';
  const details = `${weddingConfig.invitationText}\n\nالمكان: ${weddingConfig.venue}\nرابط الخريطة: ${weddingConfig.mapsUrl}`;
  const location = weddingConfig.venue;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

/**
 * Downloads a standard .ics calendar file for Apple Calendar, Outlook, and mobile devices
 */
export function downloadIcsFile(): void {
  const title = `حفل زفاف ${weddingConfig.groom} و ${weddingConfig.bride}`;
  const description = `${weddingConfig.invitationText} - ${weddingConfig.venue}`;
  const location = weddingConfig.venue;
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Hossam and Alaa//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-hossam-alaa-20260910@wedding.app',
    'DTSTAMP:20260905T120000Z',
    'DTSTART:20260910T190000',
    'DTEND:20260910T235900',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Wedding-${weddingConfig.groom}-${weddingConfig.bride}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Share wedding invitation via WhatsApp
 */
export function shareViaWhatsApp(): void {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const message = `تشرفنا دعوتكم لحفل زفاف ${weddingConfig.groom} و ${weddingConfig.bride}\nالمكان: ${weddingConfig.venue}\nالتاريخ: ${weddingConfig.date} - ${weddingConfig.time}\nرابط الدعوة: ${currentUrl}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
}
