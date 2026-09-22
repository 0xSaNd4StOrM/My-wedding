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
  bride: "أمنية",
  venue: "كازابلانكا",
  date: "الجمعة، ٢ أكتوبر",
  time: "٧:٠٠ مساءً",
  fullDateDisplay: "الجمعة، ٢ أكتوبر • الساعة ٧:٠٠ مساءً",
  basmala: "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
  quranAyah: "«وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»",
  weddingDua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  invitationIntro: "تتشرف عائلتا العروسين بدعوتكم الكريمة لمشاركتنا فرحتنا بحفل زفاف",
  invitationText: "يسعدنا ويشرفنا حضوركم لتكتمل بهجتنا، وتزدان ليلتنا بجميل صحبتكم وطيب دعواتكم المباركة.",
  mapsUrl: "https://www.google.com/maps/place/29%C2%B057'26.9%22N+31%C2%B010'42.5%22E/@29.9574665,31.1784636,15z/data=!4m4!3m3!8m2!3d29.9574722!4d31.1784722?utm_campaign=ml-sbr&g_ep=Eg1tbF8yMDI2MDkwMV8wIOC7DCoASAJQAg%3D%3D",
  addressSummary: "قاعة كازابلانكا",
};
