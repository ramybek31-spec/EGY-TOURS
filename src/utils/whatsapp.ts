import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../data/translations';

export const EGY_TOURS_WHATSAPP_PHONE = '201025221269';

/**
 * Auto-detects visitor's preferred language using stored preference or browser settings
 */
export function detectVisitorLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  try {
    // 1. Check user-selected language stored in localStorage
    const saved = localStorage.getItem('egy_tours_lang') as SupportedLanguage;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }

    // 2. Check browser navigator languages list
    const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const lang of navLangs) {
      if (!lang) continue;
      const clean = lang.toLowerCase().split('-')[0] as SupportedLanguage;
      if (clean && SUPPORTED_LANGUAGES.some((l) => l.code === clean)) {
        return clean;
      }
    }
  } catch {
    // Fallback if browser restrictions apply
  }

  return 'en';
}

/**
 * Multilingual general greetings for initial WhatsApp chat initiation
 */
export const WHATSAPP_GREETINGS: Record<SupportedLanguage, string> = {
  en: 'Hello EGY TOUR! I would like to inquire about your Hurghada tours and excursions.',
  ar: 'مرحباً إيجي تورز! أود الاستفسار عن رحلاتكم وجولاتكم السياحية في الغردقة.',
  ru: 'Здравствуйте, EGY TOUR! Я хочу узнать подробнее об экскурсиях в Хургаде.',
  de: 'Hallo EGY TOUR! Ich möchte mich über Ihre Ausflüge und Touren in Hurghada informieren.',
  fr: 'Bonjour EGY TOUR ! Je souhaiterais me renseigner sur vos excursions à Hurghada.',
  pl: 'Dzień dobry EGY TOUR! Chciałbym zapytać o wycieczki w Hurghadzie.',
  it: 'Ciao EGY TOUR! Vorrei avere informazioni sulle vostre escursioni a Hurghada.',
  es: '¡Hola EGY TOUR! Me gustaría consultar sobre sus excursiones y tours en Hurghada.'
};

/**
 * Multilingual gallery inquiry greetings
 */
export const WHATSAPP_GALLERY_GREETINGS: Record<SupportedLanguage, string> = {
  en: 'Hello EGY TOUR! I saw your photo gallery and would like to inquire about booking a tour.',
  ar: 'مرحباً إيجي تورز! لقد شاهدت معرض الصور وأود الاستفسار عن حجز رحلة.',
  ru: 'Здравствуйте, EGY TOUR! Я посмотрел вашу фотогалерею и хочу забронировать тур.',
  de: 'Hallo EGY TOUR! Ich habe Ihre Fotogalerie gesehen und möchte einen Ausflug buchen.',
  fr: "Bonjour EGY TOUR ! J'ai vu votre galerie photos et je souhaiterais réserver une excursion.",
  pl: 'Dzień dobry EGY TOUR! Zobaczyłem galerię zdjęć i chciałbym zarezerwować wycieczkę.',
  it: 'Ciao EGY TOUR! Ho visto la vostra galleria fotografica e vorrei prenotare un tour.',
  es: '¡Hola EGY TOUR! He visto su galería de fotos y me gustaría reservar una excursión.'
};

/**
 * Multilingual question / FAQ support greetings
 */
export const WHATSAPP_QUESTION_GREETINGS: Record<SupportedLanguage, string> = {
  en: 'Hello EGY TOUR! I have a question regarding your excursions and custom services.',
  ar: 'مرحباً إيجي تورز! لدي استفسار بخصوص رحلاتكم وخدماتكم الخاصة.',
  ru: 'Здравствуйте, EGY TOUR! У меня есть вопрос по поводу ваших экскурсий и услуг.',
  de: 'Hallo EGY TOUR! Ich habe eine Frage zu Ihren Ausflügen und individuellen Angeboten.',
  fr: "Bonjour EGY TOUR ! J'ai une question concernant vos excursions et vos services sur mesure.",
  pl: 'Dzień dobry EGY TOUR! Mam pytanie odnośnie Waszych wycieczek i usług na zamówienie.',
  it: 'Ciao EGY TOUR! Ho una domanda riguardo alle vostre escursioni e servizi su misura.',
  es: '¡Hola EGY TOUR! Tengo una consulta sobre sus excursiones y servicios personalizados.'
};

/**
 * Multilingual website recommendation share text
 */
export const WHATSAPP_SHARE_TEXT: Record<SupportedLanguage, string> = {
  en: 'Book VIP Hurghada & Red Sea excursions with EGY TOUR (0% deposit, instant WhatsApp booking): ',
  ar: 'احجز أفضل رحلات الغردقة والبحر الأحمر مع إيجي تورز (بدون دفعة مقدمة وتأكيد فوري عبر واتساب): ',
  ru: 'Забронируйте VIP-экскурсии в Хургаде с EGY TOUR (0% предоплаты, мгновенное подтверждение в WhatsApp): ',
  de: 'VIP-Ausflüge in Hurghada & Rotes Meer mit EGY TOUR buchen (0 % Anzahlung, sofortige WhatsApp-Bestätigung): ',
  fr: 'Réservez des excursions VIP à Hurghada avec EGY TOUR (0% d\'acompte, confirmation immédiate par WhatsApp) : ',
  pl: 'Zarezerwuj wycieczki VIP w Hurghadzie z EGY TOUR (0% zaliczki, natychmiastowe potwierdzenie na WhatsApp): ',
  it: 'Prenota escursioni VIP a Hurghada con EGY TOUR (0% anticipo, conferma immediata su WhatsApp): ',
  es: 'Reserva excursiones VIP en Hurghada con EGY TOUR (0% de anticipo, confirmación inmediata por WhatsApp): '
};

/**
 * Constructs a wa.me URL with properly encoded message
 */
export function buildWhatsAppUrl(text: string, phone = EGY_TOURS_WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Gets a localized general WhatsApp link based on current language
 */
export function getWhatsAppAutoUrl(
  lang: SupportedLanguage | string = 'en',
  type: 'general' | 'gallery' | 'question' = 'general'
): string {
  const cleanLang = (lang || 'en') as SupportedLanguage;
  let message: string;
  if (type === 'gallery') {
    message = WHATSAPP_GALLERY_GREETINGS[cleanLang] || WHATSAPP_GALLERY_GREETINGS.en;
  } else if (type === 'question') {
    message = WHATSAPP_QUESTION_GREETINGS[cleanLang] || WHATSAPP_QUESTION_GREETINGS.en;
  } else {
    message = WHATSAPP_GREETINGS[cleanLang] || WHATSAPP_GREETINGS.en;
  }
  return buildWhatsAppUrl(message);
}

/**
 * Generates dynamic quick tour inquiry text in visitor's language
 */
export function getTourInquiryMessage(
  lang: SupportedLanguage | string = 'en',
  tourTitle: string
): string {
  const cleanLang = (lang || 'en') as SupportedLanguage;
  switch (cleanLang) {
    case 'ar':
      return `مرحباً إيجي تورز! أود الاستفسار عن حجز رحلة *${tourTitle}* عبر موقعكم. برجاء إفادتي بالتوافر والتفاصيل.`;
    case 'ru':
      return `Здравствуйте, EGY TOUR! Я хочу забронировать экскурсию *${tourTitle}* с вашего сайта. Пожалуйста, подскажите детали и доступность.`;
    case 'de':
      return `Hallo EGY TOUR! Ich möchte den Ausflug *${tourTitle}* über Ihre Website buchen. Bitte teilen Sie mir Verfügbarkeit und Details mit.`;
    case 'fr':
      return `Bonjour EGY TOUR ! Je souhaite réserver l'excursion *${tourTitle}* depuis votre site web. Merci de me confirmer les disponibilités.`;
    case 'pl':
      return `Dzień dobry EGY TOUR! Chciałbym zarezerwować wycieczkę *${tourTitle}* przez Waszą stronę internetową. Proszę o potwierdzenie dostępności.`;
    case 'it':
      return `Ciao EGY TOUR! Vorrei prenotare l'escursione *${tourTitle}* dal vostro sito web. Per favore confermatemi dettagli e disponibilità.`;
    case 'es':
      return `¡Hola EGY TOUR! Me gustaría reservar la excursión *${tourTitle}* desde su sitio web. Por favor confírmenme disponibilidad y detalles.`;
    case 'en':
    default:
      return `Hello EGY TOUR! I would like to book *${tourTitle}* from your website. Please let me know availability and details.`;
  }
}

/**
 * Generates detailed tour booking message formatted in visitor's language
 */
export function getDetailedBookingMessage(
  lang: SupportedLanguage | string = 'en',
  params: {
    tourTitle: string;
    guestsCount: number;
    selectedDate: string;
    hotelName?: string;
    formattedPrice: string;
  }
): string {
  const cleanLang = (lang || 'en') as SupportedLanguage;
  const { tourTitle, guestsCount, selectedDate, hotelName, formattedPrice } = params;

  const hotelText =
    hotelName?.trim() ||
    (cleanLang === 'ar'
      ? 'سيتم التحديد لاحقاً'
      : cleanLang === 'ru'
      ? 'Уточняется'
      : cleanLang === 'de'
      ? 'Wird noch angegeben'
      : cleanLang === 'fr'
      ? 'À préciser'
      : cleanLang === 'pl'
      ? 'Do ustalenia'
      : cleanLang === 'it'
      ? 'Da definire'
      : cleanLang === 'es'
      ? 'Por definir'
      : 'To be specified');

  switch (cleanLang) {
    case 'ar':
      return (
        `مرحباً إيجي تورز! 🐪✨\n\n` +
        `أود حجز:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 عدد الأفراد: *${guestsCount}*\n` +
        `📅 التاريخ: *${selectedDate}*\n` +
        `🏨 الفندق: *${hotelText}*\n` +
        `💰 الإجمالي التقديري: *${formattedPrice}*\n\n` +
        `يرجى تأكيد التوافر وميعاد التحرك المجاني من الفندق!`
      );
    case 'ru':
      return (
        `Здравствуйте, EGY TOUR! 🐪✨\n\n` +
        `Я хочу забронировать:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Количество гостей: *${guestsCount}*\n` +
        `📅 Дата: *${selectedDate}*\n` +
        `🏨 Отель: *${hotelText}*\n` +
        `💰 Приблизительно: *${formattedPrice}*\n\n` +
        `Пожалуйста, подтвердите наличие мест и точное время трансфера из отеля!`
      );
    case 'de':
      return (
        `Hallo EGY TOUR! 🐪✨\n\n` +
        `Ich möchte gerne buchen:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Personen: *${guestsCount}*\n` +
        `📅 Datum: *${selectedDate}*\n` +
        `🏨 Hotel: *${hotelText}*\n` +
        `💰 Gesamtbetrag ca.: *${formattedPrice}*\n\n` +
        `Bitte bestätigen Sie die Verfügbarkeit und die genaue Abholzeit!`
      );
    case 'fr':
      return (
        `Bonjour EGY TOUR ! 🐪✨\n\n` +
        `Je souhaite réserver :\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Participants : *${guestsCount}*\n` +
        `📅 Date : *${selectedDate}*\n` +
        `🏨 Hôtel : *${hotelText}*\n` +
        `💰 Total estimé : *${formattedPrice}*\n\n` +
        `Merci de me confirmer les disponibilités et l'heure de prise en charge à l'hôtel !`
      );
    case 'pl':
      return (
        `Dzień dobry EGY TOUR! 🐪✨\n\n` +
        `Chciałbym zarezerwować:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Liczba osób: *${guestsCount}*\n` +
        `📅 Data: *${selectedDate}*\n` +
        `🏨 Hotel: *${hotelText}*\n` +
        `💰 Szacowany koszt: *${formattedPrice}*\n\n` +
        `Proszę o potwierdzenie dostępności oraz godziny odbioru z hotelu!`
      );
    case 'it':
      return (
        `Ciao EGY TOUR! 🐪✨\n\n` +
        `Vorrei prenotare:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Ospiti: *${guestsCount}*\n` +
        `📅 Data: *${selectedDate}*\n` +
        `🏨 Hotel: *${hotelText}*\n` +
        `💰 Totale stimato: *${formattedPrice}*\n\n` +
        `Per favore confermate la disponibilità e l'orario di prelievo in hotel!`
      );
    case 'es':
      return (
        `¡Hola EGY TOUR! 🐪✨\n\n` +
        `Me gustaría reservar:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Personas: *${guestsCount}*\n` +
        `📅 Fecha: *${selectedDate}*\n` +
        `🏨 Hotel: *${hotelText}*\n` +
        `💰 Total estimado: *${formattedPrice}*\n\n` +
        `¡Por favor confirmen disponibilidad y hora de recogida en el hotel!`
      );
    case 'en':
    default:
      return (
        `Hello EGY TOUR! 🐪✨\n\n` +
        `I would like to book:\n` +
        `📌 *${tourTitle}*\n` +
        `👥 Guests: *${guestsCount}*\n` +
        `📅 Date: *${selectedDate}*\n` +
        `🏨 Hotel: *${hotelText}*\n` +
        `💰 Est. Total: *${formattedPrice}*\n\n` +
        `Please confirm availability and hotel pickup time!`
      );
  }
}
