import type { Locale } from "./config";

export type Dict = {
  brand: string;
  tagline: string;
  nav: { home: string; jobs: string; workers: string; postJob: string; becomeWorker: string };
  cta: {
    postJob: string;
    becomeWorker: string;
    findWorker: string;
    browseJobs: string;
    apply: string;
    submit: string;
    cancel: string;
  };
  hero: { title: string; subtitle: string };
  categoriesTitle: string;
  category: {
    cleaning: string;
    handyman: string;
    construction: string;
    moving: string;
    gardening: string;
    childcare: string;
    other: string;
  };
  cityLabel: string;
  cities: string[];
  jobs: { title: string; empty: string; posted: string; budget: string; contact: string };
  workers: { title: string; empty: string; services: string; rate: string; experience: string; years: string };
  form: {
    postJobTitle: string;
    workerTitle: string;
    fieldTitle: string;
    fieldDescription: string;
    fieldCategory: string;
    fieldCity: string;
    fieldBudget: string;
    fieldName: string;
    fieldPhone: string;
    fieldEmail: string;
    fieldServices: string;
    fieldRate: string;
    fieldExperience: string;
    fieldAbout: string;
    fieldLanguages: string;
    contactPlaceholder: string;
    successJob: string;
    successWorker: string;
    seeJobs: string;
    seeWorkers: string;
    required: string;
  };
  filters: { all: string; allCities: string; search: string };
  responses: { respondTitle: string; yourMessage: string; sent: string };
  notifyBanner: string;
  footer: { rights: string; country: string };
};

const en: Dict = {
  brand: "Sababa Service",
  tagline: "Find trusted service workers in Israel",
  nav: {
    home: "Home",
    jobs: "Browse jobs",
    workers: "Browse workers",
    postJob: "Post a job",
    becomeWorker: "Become a worker",
  },
  cta: {
    postJob: "Post a job",
    becomeWorker: "Register as worker",
    findWorker: "Find a worker",
    browseJobs: "Browse jobs",
    apply: "Respond",
    submit: "Submit",
    cancel: "Cancel",
  },
  hero: {
    title: "Hire cleaners, handymen, movers and more — across Israel",
    subtitle:
      "Post a job in minutes. Get responses from verified local workers. Cleaning, handyman, construction, moving, gardening and beyond.",
  },
  categoriesTitle: "Popular categories",
  category: {
    cleaning: "Cleaning",
    handyman: "Handyman (husband for an hour)",
    construction: "Construction & renovation",
    moving: "Moving",
    gardening: "Gardening",
    childcare: "Childcare",
    other: "Other",
  },
  cityLabel: "City",
  cities: [
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Rishon LeZion",
    "Petah Tikva",
    "Ashdod",
    "Netanya",
    "Beer Sheva",
    "Bat Yam",
    "Holon",
    "Ramat Gan",
    "Herzliya",
    "Eilat",
  ],
  jobs: {
    title: "Open jobs",
    empty: "No jobs posted yet. Be the first!",
    posted: "Posted",
    budget: "Budget",
    contact: "Contact",
  },
  workers: {
    title: "Available workers",
    empty: "No workers registered yet.",
    services: "Services",
    rate: "Rate",
    experience: "Experience",
    years: "yrs",
  },
  form: {
    postJobTitle: "Post a new job",
    workerTitle: "Register as a service worker",
    fieldTitle: "Job title",
    fieldDescription: "Description",
    fieldCategory: "Category",
    fieldCity: "City",
    fieldBudget: "Budget (₪)",
    fieldName: "Name",
    fieldPhone: "Phone / WhatsApp",
    fieldEmail: "Email",
    fieldServices: "Services you offer",
    fieldRate: "Hourly rate (₪)",
    fieldExperience: "Years of experience",
    fieldAbout: "About you",
    fieldLanguages: "Languages",
    contactPlaceholder: "e.g. +972 50 123 4567",
    successJob: "Your job is posted! Workers can now respond.",
    successWorker: "You're registered! Clients can now find and contact you.",
    seeJobs: "See all jobs",
    seeWorkers: "See all workers",
    required: "required",
  },
  filters: {
    all: "All categories",
    allCities: "All cities",
    search: "Search",
  },
  responses: {
    respondTitle: "Respond to this job",
    yourMessage: "Message to the client",
    sent: "Your response was sent. The client will be notified.",
  },
  notifyBanner:
    "Coming soon: get instant Email, Telegram and WhatsApp notifications when someone responds to your job or when a matching job appears.",
  footer: {
    rights: "All rights reserved.",
    country: "Israel",
  },
};

const ru: Dict = {
  brand: "Sababa Service",
  tagline: "Найдите проверенных специалистов в Израиле",
  nav: {
    home: "Главная",
    jobs: "Заказы",
    workers: "Исполнители",
    postJob: "Разместить заказ",
    becomeWorker: "Стать исполнителем",
  },
  cta: {
    postJob: "Разместить заказ",
    becomeWorker: "Зарегистрироваться как исполнитель",
    findWorker: "Найти исполнителя",
    browseJobs: "Смотреть заказы",
    apply: "Откликнуться",
    submit: "Отправить",
    cancel: "Отмена",
  },
  hero: {
    title: "Уборщики, мужья на час, грузчики и мастера — по всему Израилю",
    subtitle:
      "Разместите заказ за пару минут. Получайте отклики от проверенных исполнителей. Уборка, ремонт, стройка, переезды, сад и многое другое.",
  },
  categoriesTitle: "Популярные категории",
  category: {
    cleaning: "Уборка",
    handyman: "Муж на час",
    construction: "Стройка и ремонт",
    moving: "Переезды",
    gardening: "Сад",
    childcare: "Няни",
    other: "Другое",
  },
  cityLabel: "Город",
  cities: [
    "Тель-Авив",
    "Иерусалим",
    "Хайфа",
    "Ришон-ле-Цион",
    "Петах-Тиква",
    "Ашдод",
    "Нетания",
    "Беэр-Шева",
    "Бат-Ям",
    "Холон",
    "Рамат-Ган",
    "Герцлия",
    "Эйлат",
  ],
  jobs: {
    title: "Открытые заказы",
    empty: "Пока нет заказов. Разместите первый!",
    posted: "Опубликовано",
    budget: "Бюджет",
    contact: "Контакт",
  },
  workers: {
    title: "Свободные исполнители",
    empty: "Пока нет зарегистрированных исполнителей.",
    services: "Услуги",
    rate: "Ставка",
    experience: "Опыт",
    years: "лет",
  },
  form: {
    postJobTitle: "Новый заказ",
    workerTitle: "Регистрация исполнителя",
    fieldTitle: "Заголовок",
    fieldDescription: "Описание",
    fieldCategory: "Категория",
    fieldCity: "Город",
    fieldBudget: "Бюджет (₪)",
    fieldName: "Имя",
    fieldPhone: "Телефон / WhatsApp",
    fieldEmail: "Email",
    fieldServices: "Ваши услуги",
    fieldRate: "Цена за час (₪)",
    fieldExperience: "Опыт (лет)",
    fieldAbout: "О себе",
    fieldLanguages: "Языки",
    contactPlaceholder: "например +972 50 123 4567",
    successJob: "Заказ опубликован! Исполнители могут откликнуться.",
    successWorker: "Вы зарегистрированы! Клиенты могут связаться с вами.",
    seeJobs: "Смотреть заказы",
    seeWorkers: "Смотреть исполнителей",
    required: "обязательно",
  },
  filters: {
    all: "Все категории",
    allCities: "Все города",
    search: "Поиск",
  },
  responses: {
    respondTitle: "Откликнуться на заказ",
    yourMessage: "Сообщение клиенту",
    sent: "Отклик отправлен. Клиент получит уведомление.",
  },
  notifyBanner:
    "Скоро: мгновенные уведомления по Email, Telegram и WhatsApp — когда кто-то откликнулся на ваш заказ или появилась подходящая работа.",
  footer: {
    rights: "Все права защищены.",
    country: "Израиль",
  },
};

const he: Dict = {
  brand: "Sababa Service",
  tagline: "מצאו אנשי מקצוע אמינים בישראל",
  nav: {
    home: "בית",
    jobs: "עבודות",
    workers: "בעלי מקצוע",
    postJob: "פרסום עבודה",
    becomeWorker: "הרשמה כבעל מקצוע",
  },
  cta: {
    postJob: "פרסום עבודה",
    becomeWorker: "הרשמה כבעל מקצוע",
    findWorker: "חיפוש בעל מקצוע",
    browseJobs: "לכל העבודות",
    apply: "הגשת מועמדות",
    submit: "שליחה",
    cancel: "ביטול",
  },
  hero: {
    title: "מנקים, הנדימנים, מובילים ובעלי מקצוע — בכל הארץ",
    subtitle:
      "פרסמו עבודה תוך דקות. קבלו פניות מבעלי מקצוע מקומיים. ניקיון, תיקונים, בנייה, הובלות, גינון ועוד.",
  },
  categoriesTitle: "קטגוריות פופולריות",
  category: {
    cleaning: "ניקיון",
    handyman: "הנדימן (בעל בית לשעה)",
    construction: "בנייה ושיפוצים",
    moving: "הובלות",
    gardening: "גינון",
    childcare: "טיפול בילדים",
    other: "אחר",
  },
  cityLabel: "עיר",
  cities: [
    "תל אביב",
    "ירושלים",
    "חיפה",
    "ראשון לציון",
    "פתח תקווה",
    "אשדוד",
    "נתניה",
    "באר שבע",
    "בת ים",
    "חולון",
    "רמת גן",
    "הרצליה",
    "אילת",
  ],
  jobs: {
    title: "עבודות פתוחות",
    empty: "עדיין אין עבודות. היו הראשונים!",
    posted: "פורסם",
    budget: "תקציב",
    contact: "יצירת קשר",
  },
  workers: {
    title: "בעלי מקצוע זמינים",
    empty: "עדיין אין בעלי מקצוע רשומים.",
    services: "שירותים",
    rate: "תעריף",
    experience: "ניסיון",
    years: "שנים",
  },
  form: {
    postJobTitle: "פרסום עבודה חדשה",
    workerTitle: "הרשמה כבעל מקצוע",
    fieldTitle: "כותרת העבודה",
    fieldDescription: "תיאור",
    fieldCategory: "קטגוריה",
    fieldCity: "עיר",
    fieldBudget: "תקציב (₪)",
    fieldName: "שם",
    fieldPhone: "טלפון / וואטסאפ",
    fieldEmail: "אימייל",
    fieldServices: "שירותים שאתם מציעים",
    fieldRate: "תעריף לשעה (₪)",
    fieldExperience: "שנות ניסיון",
    fieldAbout: "עליכם",
    fieldLanguages: "שפות",
    contactPlaceholder: "לדוגמה +972 50 123 4567",
    successJob: "העבודה פורסמה! בעלי מקצוע יכולים להגיב.",
    successWorker: "נרשמתם! לקוחות יכולים ליצור איתכם קשר.",
    seeJobs: "כל העבודות",
    seeWorkers: "כל בעלי המקצוע",
    required: "חובה",
  },
  filters: {
    all: "כל הקטגוריות",
    allCities: "כל הערים",
    search: "חיפוש",
  },
  responses: {
    respondTitle: "הגשת מועמדות לעבודה",
    yourMessage: "הודעה ללקוח",
    sent: "התגובה נשלחה. הלקוח יקבל התראה.",
  },
  notifyBanner:
    "בקרוב: התראות מיידיות באימייל, טלגרם וואטסאפ — כשמישהו מגיב לעבודה שלכם או כשמופיעה עבודה מתאימה.",
  footer: {
    rights: "כל הזכויות שמורות.",
    country: "ישראל",
  },
};

const dictionaries: Record<Locale, Dict> = { en, ru, he };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}
