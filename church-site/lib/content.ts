import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  return JSON.parse(file);
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
};

export type Sermon = {
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  description: string;
  mediaUrl?: string;
};

export type ChurchEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};
