export interface WeddingConfig {
  groom: string;
  bride: string;
  venue: string;
  date: string;
  time: string;
  fullDateDisplay: string;
  basmala: string;
  quranAyah: string;
  weddingDua: string;
  invitationIntro: string;
  invitationText: string;
  mapsUrl: string;
  addressSummary: string;
}

export const weddingConfig: WeddingConfig = {
  groom: "حسام",
  bride: "آلاء",
  venue: "قاعة ليلة العمر",
  date: "الخميس، ١٠ سبتمبر",
  time: "٧:٠٠ مساءً",
  fullDateDisplay: "الخميس، ١٠ سبتمبر • الساعة ٧:٠٠ مساءً",
  basmala: "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
  quranAyah: "«وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»",
  weddingDua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  invitationIntro: "تتشرف عائلتا العروسين بدعوتكم الكريمة لمشاركتنا فرحتنا بحفل زفاف",
  invitationText: "يسعدنا ويشرفنا حضوركم لتكتمل بهجتنا، وتزدان ليلتنا بجميل صحبتكم وطيب دعواتكم المباركة.",
  mapsUrl: "https://maps.app.goo.gl/8DUGQofuRXreDYyA8",
  addressSummary: "قاعة ليلة العمر",
};
