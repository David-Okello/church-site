import fs from "fs";
import path from "path";
import matter from "gray-matter";

export { getYouTubeId, getYouTubeThumbnail } from "./youtube";

const contentDir = path.join(process.cwd(), "content");

export function getSettings() {
  const file = fs.readFileSync(path.join(contentDir, "settings.json"), "utf8");
  return JSON.parse(file) as Settings;
}

export function getLeadership(): Leader[] {
  const file = fs.readFileSync(
    path.join(contentDir, "leadership.json"),
    "utf8"
  );
  return (JSON.parse(file) as { leaders: Leader[] }).leaders;
}

export function getMinistries(): Ministry[] {
  const filePath = path.join(contentDir, "ministries.json");
  if (!fs.existsSync(filePath)) return [];
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return Array.isArray(parsed) ? parsed : parsed.ministries ?? [];
}

export function getSermons(): Sermon[] {
  const dir = path.join(contentDir, "sermons");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as Sermon;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isAnnouncementExpired(a: Announcement): boolean {
  if (!a.endDate) return false;
  const end = new Date(a.endDate);
  return !isNaN(end.getTime()) && end.getTime() < Date.now();
}

export function getAnnouncements(): Announcement[] {
  const dir = path.join(contentDir, "announcements");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as Announcement;
    })
    .filter((a) => a.active !== false && !isAnnouncementExpired(a))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEvents(): ChurchEvent[] {
  const dir = path.join(contentDir, "events");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as ChurchEvent;
    })
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getGallery(): GalleryItem[] {
  const dir = path.join(contentDir, "gallery");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as GalleryItem;
    })
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

// Editable page text (with baked-in fallbacks so the build never breaks)
export function getHomeContent(): HomeContent {
  const merged = { ...HOME_DEFAULTS, ...readJson("pages/home.json") };
  return merged as HomeContent;
}

export function getAboutContent(): AboutContent {
  const merged = { ...ABOUT_DEFAULTS, ...readJson("pages/about.json") };
  return merged as AboutContent;
}

export function getGiveContent(): GiveContent {
  const merged = { ...GIVE_DEFAULTS, ...readJson("pages/give.json") };
  return merged as GiveContent;
}

export function getSermonsPageContent(): SermonsPageContent {
  const merged = { ...SERMONS_PAGE_DEFAULTS, ...readJson("pages/sermons.json") };
  return merged as SermonsPageContent;
}

export function getEventsPageContent(): EventsPageContent {
  const merged = { ...EVENTS_PAGE_DEFAULTS, ...readJson("pages/events.json") };
  return merged as EventsPageContent;
}

export function getGalleryPageContent(): GalleryPageContent {
  const merged = { ...GALLERY_PAGE_DEFAULTS, ...readJson("pages/gallery.json") };
  return merged as GalleryPageContent;
}

export function getContactPageContent(): ContactPageContent {
  const merged = { ...CONTACT_PAGE_DEFAULTS, ...readJson("pages/contact.json") };
  return merged as ContactPageContent;
}

function readJson(rel: string): Record<string, unknown> {
  const filePath = path.join(contentDir, rel);
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

const HOME_DEFAULTS: HomeContent = {
  heroImage: "/uploads/hero-home.jpg",
  heroTitleLine1: "The Episcopal Diocese",
  heroTitleLine2: "of Wanyjok.",
  heroSubtext:
    "An Anglican family of more than 47,000 believers in Aweil East, equipping the Church for mission and raising up faithful Christian leaders.",
  storyParagraph:
    "One of the youngest and fastest-growing dioceses in the Episcopal Church of South Sudan, created as an area diocese in 2017 and made autonomous in 2019. Today the Diocese is home to more than 47,000 believers, under the leadership of its first bishop, Rt. Rev. Joseph Mamer Manot.",
  missionText:
    "We exist to equip the Church for mission and to raise up faithful Christian leaders, serving South Sudan not only in worship, but in education, health, peace, and humanitarian care.",
  heroScheduleLabel: "When we gather",
  sermonsKicker: "From the pulpit",
  sermonsHeading: "Latest Sermons",
  scheduleKicker: "Every week",
  scheduleHeading: "Gatherings through the week",
  ministriesKicker: "Community life",
  ministriesHeading: "Find your place",
  ministriesText:
    "From the Mothers' Union to youth ministry, cell groups to evangelism: there is a place for everyone to belong, grow in faith, and serve across the Diocese.",
  bishopImage: "/uploads/bishop-joseph.jpg",
  bishopWordKicker: "A word from the Bishop",
  announcementsKicker: "Notice board",
  announcementsHeading: "Announcements",
  eventsKicker: "Diocesan calendar",
  eventsHeading: "Upcoming events",
  verseKicker: "Our vision",
  ctaTitle: "You are welcome in this house.",
  ctaSubtext:
    "Join us for worship this Sunday, or reach out any day of the week. We would be glad to hear from you.",
};

const ABOUT_DEFAULTS: AboutContent = {
  heroImage: "/uploads/hero-about.jpg",
  openingLine1: "One of the youngest dioceses in South Sudan.",
  openingLine2: "And one of the fastest growing.",
  storyKicker: "Our story",
  storyParagraphs: [
    "The Episcopal Diocese of Wanyjok is one of the youngest and fastest-growing dioceses in the Episcopal Church of South Sudan. It was created as an area diocese in 2017 and became an autonomous diocese on 28 April 2019, with Rt. Rev. Joseph Mamer Manot as its first bishop.",
    "Today the Diocese is home to more than 47,000 Christian members across Aweil East, in the internal province of Northern Bahr el Ghazal. From a single cathedral congregation it has grown into a network of parishes, archdeaconries, unions, and departments serving communities near and far.",
    "Christian mission has been present in this land since the nineteenth century, and the Church has become one of its most trusted institutions, playing a vital role not only in worship and discipleship, but in humanitarian and social services, peace, education, and health.",
  ],
  valuesKicker: "What we believe",
  valuesHeading: "Our core values",
  values: [
    { title: "Faith", description: "Trusting God's word above our circumstances, always." },
    { title: "Mission", description: "Equipping the whole Church to carry the Gospel to all people." },
    { title: "Service", description: "Serving our communities in health, education, peace, and relief." },
    { title: "Prayer", description: "A Diocese that prays together stays together and grows together." },
    { title: "Biblical Truth", description: "Anchored in Scripture: our map for life, faith, and community." },
    { title: "Unity", description: "One body, many parts, united around Jesus Christ." },
  ],
  structureKicker: "How we are organised",
  structureHeading: "Diocesan structure",
  structureText:
    "The Diocese is led by the Bishop, supported by the cathedral and administrative offices, and served by a family of unions, archdeaconries, and departments.",
  departments: [
    "Finance & Administration",
    "Mission & Evangelism",
    "Health Department",
    "Education Department",
    "Agriculture Department",
    "Development Department",
    "Communications Department",
    "Chaplaincy & Prison",
    "Bible School Department",
    "Sunday School & Children Ministry",
    "Prayers Group",
    "Praise & Worship",
  ],
  teamKicker: "The team",
  teamHeading: "The people who lead",
  teamText: "Servant leaders committed to guiding the Diocese with wisdom, humility, and a heart for God and people.",
  ministriesKicker: "Get involved",
  ministriesHeading: "Ministries",
  ministriesText: "There is a place for everyone to belong, grow, and serve in this Diocesan family.",
  ctaHeading: "Ready to be part of this family?",
  ctaText: "Get in touch and let us know you are coming. We will be glad to welcome you.",
};

const GIVE_DEFAULTS: GiveContent = {
  heroImage: "/uploads/hero-give.jpg",
  heroKicker: "Support the Diocese",
  heroTitle: "Give toward the work of the Diocese.",
  heroSubtext: "Your generosity helps equip the Church for mission and raise up faithful Christian leaders across Aweil East.",
  introText:
    "Equipping the Church for mission and raising up faithful Christian leaders. What you give, in whatever amount, goes directly toward that work: it does not pass through this website. Every gift, large or small, is received with gratitude and put to use across the Diocese's parishes and ministries.",
  ways: [
    { title: "Bank Transfer", description: "Transfer directly using the account details below." },
    { title: "Mobile Money", description: "Contact us for mobile money details." },
    { title: "In Person or WhatsApp", description: "Reach out directly and we'll arrange the best way for you to give.", whatsapp: true },
  ],
  bankDetails: {
    bankName: "Kenya Commercial Bank",
    accountName: "The Episcopal Diocese of Wanyjok- ECSS",
    accountNumber: "5590367271",
    branch: "Aweil Branch",
  },
  supportAreas: [
    { title: "Discipleship & Leadership", description: "Training pastors, catechists, and lay leaders serving parishes across the Diocese." },
    { title: "Education", description: "Supporting church-run schools and the Bible School Department." },
    { title: "Health & Outreach", description: "Humanitarian and social services carried out in partnership with local communities." },
    { title: "Church Buildings", description: "Constructing and maintaining places of worship as the Diocese continues to grow." },
  ],
  closingTitle: "Questions about giving?",
  closingText: "Reach out any time. We're glad to talk through how your support can be put to use.",
};

const SERMONS_PAGE_DEFAULTS: SermonsPageContent = {
  heroImage: "/uploads/hero-sermons.jpg",
  heroKicker: "Media ministry",
  heroTitle: "Sermons",
  heroSubtext: "Teachings from God's Word for your encouragement, growth, and edification.",
  noticeHeading: "Recordings coming soon",
  noticeText: "Join us in person or send a WhatsApp message to receive sermon notes directly.",
};

const EVENTS_PAGE_DEFAULTS: EventsPageContent = {
  heroImage: "/uploads/hero-events.jpg",
  heroKicker: "Church calendar",
  heroTitle: "Upcoming events",
  heroSubtext: "Life across the Diocese is about more than Sunday mornings. Here is what is coming up, and there is always room for one more.",
  scheduleKicker: "Every week",
  scheduleHeading: "Regular gatherings",
};

const GALLERY_PAGE_DEFAULTS: GalleryPageContent = {
  heroImage: "/uploads/hero-gallery.jpg",
  heroKicker: "Diocese in pictures",
  heroTitle: "Gallery",
  heroSubtext: "Moments of worship, fellowship, and service from across the Diocese of Wanyjok.",
};

const CONTACT_PAGE_DEFAULTS: ContactPageContent = {
  heroImage: "/uploads/hero-contact.jpg",
  heroKicker: "Connect with us",
  heroTitle: "We would love to hear from you.",
  heroSubtext: "A question, a prayer request, or just wanting to know when to come. Reach out any way that works for you.",
  infoHeading: "Church information",
  serviceTimesLabel: "Service times",
  followKicker: "Follow the Diocese",
  formHeading: "Send a message",
  formSubtext: "Whether it is a prayer request, a question, or just a hello. We will respond as soon as we can.",
};

export type Settings = {
  churchName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  serviceTimes: { day: string; time: string; label: string }[];
  pastorName: string;
  pastorQuote: string;
  missionStatement: string;
  foundedYear: string;
  denomination: string;
  verseText: string;
  verseReference: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
};

export type Announcement = {
  title: string;
  date: string;
  endDate?: string;
  body: string;
  active: boolean;
};

export type Leader = {
  name: string;
  role: string;
  bio: string;
  tag?: string;
  image?: string;
};

export type Ministry = {
  title: string;
  description: string;
};

export type GalleryItem = {
  image: string;
  video?: string;
  caption?: string;
  category?: string;
  date?: string;
};

export type HomeContent = {
  heroImage: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtext: string;
  storyParagraph: string;
  missionText: string;
  heroScheduleLabel: string;
  sermonsKicker: string;
  sermonsHeading: string;
  scheduleKicker: string;
  scheduleHeading: string;
  ministriesKicker: string;
  ministriesHeading: string;
  ministriesText: string;
  bishopImage: string;
  bishopWordKicker: string;
  announcementsKicker: string;
  announcementsHeading: string;
  eventsKicker: string;
  eventsHeading: string;
  verseKicker: string;
  ctaTitle: string;
  ctaSubtext: string;
};

export type AboutContent = {
  heroImage: string;
  openingLine1: string;
  openingLine2: string;
  storyKicker: string;
  storyParagraphs: string[];
  valuesKicker: string;
  valuesHeading: string;
  values: { title: string; description: string }[];
  structureKicker: string;
  structureHeading: string;
  structureText: string;
  departments: string[];
  teamKicker: string;
  teamHeading: string;
  teamText: string;
  ministriesKicker: string;
  ministriesHeading: string;
  ministriesText: string;
  ctaHeading: string;
  ctaText: string;
};

export type GiveContent = {
  heroImage: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtext: string;
  introText: string;
  ways: { title: string; description: string; whatsapp?: boolean }[];
  bankDetails: { bankName: string; accountName: string; accountNumber: string; branch: string };
  supportAreas: { title: string; description: string }[];
  closingTitle: string;
  closingText: string;
};

// Shared shape for pages that only need a hero image + kicker + title + subtext
export type HeroPageContent = {
  heroImage: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtext: string;
};

export type SermonsPageContent = HeroPageContent & {
  noticeHeading: string;
  noticeText: string;
};

export type EventsPageContent = HeroPageContent & {
  scheduleKicker: string;
  scheduleHeading: string;
};

export type GalleryPageContent = HeroPageContent;

export type ContactPageContent = HeroPageContent & {
  infoHeading: string;
  serviceTimesLabel: string;
  followKicker: string;
  formHeading: string;
  formSubtext: string;
};

export type Sermon = {
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  description: string;
  mediaUrl?: string;
  keyPoints?: string[];
  discussionQuestions?: string[];
  prayerPoints?: string[];
};

export type ChurchEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};
