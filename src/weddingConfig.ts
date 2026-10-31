export interface WeddingEventItem {
  id: string;
  title: string;
  subtitle?: string;
  tag: string;
  dayAndDate: string; // e.g. "الجُمُعَة 6 / 11"
  dayName: string; // "الجمعة"
  dayNumber: string; // "٦"
  monthName: string; // "نوفمبر"
  time: string; // "عَقِب صَلاة العَصٌر"
  venue: string; // "مَسْجِدُ أَبُوحِجَازَةَ شَارِعِ سَعْدِ زَغْلُولِ"
  addressShort: string;
  mapsUrl?: string;
  isMain?: boolean;
  calendarStartTime: string;
  calendarEndTime: string;
}

export interface WeddingConfig {
  groom: string;
  groomFullName: string;
  bride: string;
  brideFullName: string;
  venue: string;
  date: string;
  time: string;
  fullDateDisplay: string;
  basmala: string;
  quranAyah: string;
  quranSurah: string;
  poetryLine1: string;
  poetryLine2: string;
  invitationIntro: string;
  invitationSub: string;
  invitationText: string;
  weddingDua: string;
  mapsUrl: string;
  addressSummary: string;
  events: WeddingEventItem[];
}

export const weddingConfig: WeddingConfig = {
  groom: "أحمد بن عمرو",
  groomFullName: "أحمد بن عمرو محمد خليل",
  bride: "أبنة علي السيد عجمي",
  brideFullName: "أبنة علي السيد عجمي (الثانية)",
  venue: "جَزِيرَةُ الْمَعَادِي",
  date: "الثلاثاء، ١٠ نوفمبر",
  time: "مساءً",
  fullDateDisplay: "الثلاثاء، ١٠ نوفمبر • جَزِيرَةُ الْمَعَادِي",
  basmala: "🕊️ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ 🕊️",
  quranAyah: "«وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ»",
  quranSurah: "[سورة الروم: 21]",
  poetryLine1: "إِنَّ الـسُّــرُورَ إِذَا تَـــشَـــارَكَ ضُــو عِــفَـــتْ",
  poetryLine2: "بَــسَــمَــاتُـــهُ مَــعَ زُــــمْـــرَةِ الأَحْـــــبَـــــةِ",
  invitationIntro: "نَتَشَـــرَّفُ بِدَعْوَتِكُـــمْ",
  invitationSub: "لِحُضُــورِ مَنَاسَبَةِ زِفَـــافِناَ",
  invitationText: "يسعدنا ويشرفنا حضوركم لتكتمل بهجتنا، وتزدان أيامنا بجميل صحبتكم وطيب دعواتكم المباركة في كافة مناسباتنا.",
  weddingDua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  mapsUrl: "https://maps.app.goo.gl/mhVa8oopGAh8C7zU9?g_st=aw",
  addressSummary: "جزيرة المعادي",
  events: [
    {
      id: "aqd-qiran",
      title: "عَـــقْـــدُ الــقِـــرَانِ",
      subtitle: "بداية الميثاق الغليظ المبارك",
      tag: "الافتتاح المبارك",
      dayAndDate: "الجُمُعَة 6 / 11",
      dayName: "الجمعة",
      dayNumber: "٦",
      monthName: "نوفمبر",
      time: "عَقِب صَلاة العَصٌر",
      venue: "مَسْجِدُ أَبُوحِجَازَةَ - شَارِعِ سَعْدِ زَغْلُولِ",
      addressShort: "مسجد أبوحجازة",
      mapsUrl: "https://maps.app.goo.gl/d2kQQ1pndENujPSA7",
      isMain: false,
      calendarStartTime: "20261106T153000",
      calendarEndTime: "20261106T180000",
    },
    {
      id: "henna-women",
      title: "حِــنَّـــةُ الــنِّــسَــاءِ",
      subtitle: "ليلة الفرح والزغاريد والبهجة",
      tag: "بهجة وسرور",
      dayAndDate: "ألأحَد 8 / 11",
      dayName: "الأحد",
      dayNumber: "٨",
      monthName: "نوفمبر",
      time: "مساءً",
      venue: "بِـجِـوَارِ اِلْـمِـعْـهَـدِ اِلْـأَزْهَرِيُّ",
      addressShort: "بجوار المعهد الأزهري",
      mapsUrl: "https://maps.app.goo.gl/YnoW8vGDagkRUkHbA",
      isMain: false,
      calendarStartTime: "20261108T180000",
      calendarEndTime: "20261108T230000",
    },
    {
      id: "banquet-men",
      title: "الــوَلِــيــمَــةُ وَحِــنَّـــةُ الــرِّجَــالِ",
      subtitle: "ضيافة الأهل والأحباب والكرام",
      tag: "كرم وضيافة",
      dayAndDate: "الاثنين 9 / 11",
      dayName: "الاثنين",
      dayNumber: "٩",
      monthName: "نوفمبر",
      time: "طوال اليوم",
      venue: "فِي المَنزِل (بيت العائلة)",
      addressShort: "في المنزل",
      mapsUrl: undefined,
      isMain: false,
      calendarStartTime: "20261109T140000",
      calendarEndTime: "20261109T230000",
    },
    {
      id: "wedding-party",
      title: "حَــفْــلُ الــزِّفَــافِ وَالـسِّـيـشِـن",
      subtitle: "الليلة الكبرى واللحظة المنتظرة",
      tag: "الحفل الرئيسي",
      dayAndDate: "الثلاثاء 10 / 11",
      dayName: "الثلاثاء",
      dayNumber: "١٠",
      monthName: "نوفمبر",
      time: "مساءً",
      venue: "جَزِيرَةُ الْمَعَادِي",
      addressShort: "جزيرة المعادي",
      mapsUrl: "https://maps.app.goo.gl/mhVa8oopGAh8C7zU9?g_st=aw",
      isMain: true,
      calendarStartTime: "20261110T190000",
      calendarEndTime: "20261110T235900",
    },
  ],
};
