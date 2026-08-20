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
    .filter((a) => a.active !== false)
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
  heroTitleLine1: "The Episcopal Diocese",
  heroTitleLine2: "of Wanyjok.",
  heroSubtext:
    "An Anglican family of more than 47,000 believers in Aweil East, equipping the Church for mission and raising up faithful Christian leaders.",
  storyParagraph:
    "One of the youngest and fastest-growing dioceses in the Episcopal Church of South Sudan, created as an area diocese in 2017 and made autonomous in 2019. Today the Diocese is home to more than 47,000 believers, under the leadership of its first bishop, Rt. Rev. Joseph Mamer Manot.",
  missionText:
    "We exist to equip the Church for mission and to raise up faithful Christian leaders, serving South Sudan not only in worship, but in education, health, peace, and humanitarian care.",
  ctaTitle: "You are welcome in this house.",
  ctaSubtext:
    "Join us for worship this Sunday, or reach out any day of the week. We would be glad to hear from you.",
};

const ABOUT_DEFAULTS: AboutContent = {
  openingLine1: "One of the youngest dioceses in South Sudan.",
  openingLine2: "And one of the fastest growing.",
  storyParagraphs: [
    "The Episcopal Diocese of Wanyjok is one of the youngest and fastest-growing dioceses in the Episcopal Church of South Sudan. It was created as an area diocese in 2017 and became an autonomous diocese on 28 April 2019, with Rt. Rev. Joseph Mamer Manot as its first bishop.",
    "Today the Diocese is home to more than 47,000 Christian members across Aweil East, in the internal province of Northern Bahr el Ghazal. From a single cathedral congregation it has grown into a network of parishes, archdeaconries, unions, and departments serving communities near and far.",
    "Christian mission has been present in this land since the nineteenth century, and the Church has become one of its most trusted institutions, playing a vital role not only in worship and discipleship, but in humanitarian and social services, peace, education, and health.",
  ],
};

const GIVE_DEFAULTS: GiveContent = {
  heroKicker: "Support the Diocese",
  heroTitle: "Give toward the work of the Diocese.",
  heroSubtext: "Your generosity helps equip the Church for mission and raise up faithful Christian leaders across Aweil East.",
  introText:
    "Equipping the Church for mission and raising up faithful Christian leaders. What you give, in whatever amount, goes directly toward that work: it does not pass through this website. Every gift, large or small, is received with gratitude and put to use across the Diocese's parishes and ministries.",
  ways: [
    { title: "Bank Transfer", description: "Contact us for the Diocese's bank account details." },
    { title: "Mobile Money", description: "Contact us for mobile money details." },
    { title: "In Person or WhatsApp", description: "Reach out directly and we'll arrange the best way for you to give.", whatsapp: true },
  ],
  supportAreas: [
    { title: "Discipleship & Leadership", description: "Training pastors, catechists, and lay leaders serving parishes across the Diocese." },
    { title: "Education", description: "Supporting church-run schools and the Bible School Department." },
    { title: "Health & Outreach", description: "Humanitarian and social services carried out in partnership with local communities." },
    { title: "Church Buildings", description: "Constructing and maintaining places of worship as the Diocese continues to grow." },
  ],
  closingTitle: "Questions about giving?",
  closingText: "Reach out any time. We're glad to talk through how your support can be put to use.",
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
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtext: string;
  storyParagraph: string;
  missionText: string;
  ctaTitle: string;
  ctaSubtext: string;
};

export type AboutContent = {
  openingLine1: string;
  openingLine2: string;
  storyParagraphs: string[];
};

export type GiveContent = {
  heroKicker: string;
  heroTitle: string;
  heroSubtext: string;
  introText: string;
  ways: { title: string; description: string; whatsapp?: boolean }[];
  supportAreas: { title: string; description: string }[];
  closingTitle: string;
  closingText: string;
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
