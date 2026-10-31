import { weddingConfig, WeddingEventItem } from '../weddingConfig';

/**
 * Generates a Google Calendar add event URL for a specific event or the main wedding
 */
export function getGoogleCalendarUrl(event?: WeddingEventItem): string {
  const targetEvent = event || weddingConfig.events.find(e => e.isMain) || weddingConfig.events[0];
  const title = `${targetEvent.title} - زفاف ${weddingConfig.groomFullName} و ${weddingConfig.brideFullName}`;
  const startTime = targetEvent.calendarStartTime;
  const endTime = targetEvent.calendarEndTime;
  const details = `${targetEvent.subtitle || ''}\n\nالموعد: ${targetEvent.dayAndDate} (${targetEvent.time})\nالمكان: ${targetEvent.venue}\n${targetEvent.mapsUrl ? 'رابط الخريطة: ' + targetEvent.mapsUrl : ''}\n\n${weddingConfig.invitationText}`;
  const location = targetEvent.venue;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

/**
 * Downloads a standard .ics calendar file for Apple Calendar, Outlook, and mobile devices
 */
export function downloadIcsFile(event?: WeddingEventItem): void {
  const targetEvent = event || weddingConfig.events.find(e => e.isMain) || weddingConfig.events[0];
  const title = `${targetEvent.title} - زفاف ${weddingConfig.groomFullName} و ${weddingConfig.brideFullName}`;
  const description = `${targetEvent.dayAndDate} - ${targetEvent.time} - ${targetEvent.venue} - ${weddingConfig.invitationText}`;
  const location = targetEvent.venue;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Ahmed and Bride//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${targetEvent.id}-202611@wedding.app`,
    'DTSTAMP:20261031T120000Z',
    `DTSTART:${targetEvent.calendarStartTime}`,
    `DTEND:${targetEvent.calendarEndTime}`,
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
  link.setAttribute('download', `Wedding-${targetEvent.id}.ics`);
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
  const message = `🕊️ نتشرف بدعوتكم لحضور مناسبة زفاف:
${weddingConfig.groomFullName}
💍 ${weddingConfig.brideFullName}

برنامج المناسبات:
• عقد القران: الجمعة 6/11 (مسجد أبوحجازة)
• حنة النساء: الأحد 8/11 (بجوار المعهد الأزهري)
• الوليمة وحنة الرجال: الاثنين 9/11 (في المنزل)
• حفل الزفاف والسيشن: الثلاثاء 10/11 (جزيرة المعادي)

رابط الدعوة وتفاصيل المواقع:
${currentUrl}`;

  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
}
