# Using the Website Admin Panel

This guide walks through adding and editing content on the Episcopal Diocese of Wanyjok website. No coding needed — everything here happens through a form in your browser.

## 1. Log in

1. Go to **https://church-site-27m.pages.dev/admin**
2. Click **Login with GitHub**
3. The first time, GitHub will ask you to authorize the app — approve it
4. You'll land on the admin dashboard, with a list of content sections on the left

You need a GitHub account with access to the `David-Okello/church-site` repository to log in. If you don't have one yet, ask David to invite you.

## 2. How saving works

There's no separate "publish" button hiding behind a delay. When you click **Save** (or **Publish**, depending on the section), your change is written straight to the website's source code and the live site rebuilds automatically — it's usually live within a minute or two. There's no draft/review step, so double-check what you typed before saving.

If two people edit the same entry at the same time, whoever saves second can overwrite the other's change. It's rare, but worth being aware of if more than one of you is adding content in the same sitting.

## 3. The sections

The left-hand menu has these sections:

- **Sermons**
- **Events**
- **Announcements**
- **Photo Gallery**
- **Page Text** (Homepage, About page)
- **Church Settings** (Site settings, Leadership team, Ministries)

Sermons, Events, Announcements, and Photo Gallery are **collections** — click into one, then **New [item]** to add another entry, or click an existing entry to edit it. Page Text and Church Settings are **single documents** — there's only one "Homepage," one "Site settings," and so on, and you're editing that one document directly.

### Sermons

Fields: Title, Speaker, Date, Scripture reference, Description, Media URL, Key points, Discussion questions, Prayer points.

- **Media URL** is where a YouTube link goes (a full `youtube.com/watch?v=...` link, a `youtu.be/...` short link, or a `youtube.com/shorts/...` link all work). Leave it blank if there's no recording yet — the site handles that gracefully. When there is a link, the site shows a clickable video thumbnail that plays right on the page.
- **Key points**, **Discussion questions**, and **Prayer points** are all optional lists — click **+ Add** to add another line, and the trash icon to remove one. If you leave all three empty, the site just shows "Notes and questions will be added after the service" instead.
- The newest sermon (by date) is automatically labeled "Most Recent" and featured on the homepage — you don't set that manually.

### Events

Fields: Event title, Date, Time, Location, Description. Time is free text (e.g. `10:00 AM`), not a picker.

### Announcements

Fields: Title, Date, Body, **Show on homepage** (a toggle). Turn that toggle off for an announcement you want to keep archived without deleting it — it just won't display anywhere on the site while off.

### Photo Gallery

Fields: Photo (upload), Video URL, Caption, Category (a dropdown: Worship, Youth, Outreach, Events, Cathedral, Community), Date.

Only the photo itself is required — caption, category, and date can be left blank if you just want to get a photo up quickly and label it properly later. Upload reasonably sized JPG or PNG files; there's no strict limit, but very large camera-original files will make the gallery slow to load for visitors on weak connections.

- **Video URL** turns an entry into a video: paste a YouTube link and the Photo becomes its cover image, playable right on the gallery page. Never upload a raw video file here — video files are far too large for this site (a single phone video can be hundreds of MB, way over what a website like this should carry). Upload the video to the diocese's YouTube channel first, then paste the link here.
- With well over a hundred photos now in the gallery, use the **Year** grouping and the category filters near the top of the list (Worship, Youth, Outreach, etc., plus a "Videos only" filter) to find something instead of scrolling through everything.

### Page Text

- **Homepage**: the hero headline (two lines, the second one is highlighted in the design), hero subtext, the story paragraph, the mission strip text, and the closing call-to-action heading/subtext.
- **About page**: the two opening lines and a list of story paragraphs (add/remove/reorder paragraphs freely).

### Church Settings

- **Site settings**: church name, tagline, address, phone, email, WhatsApp, pastor name and quote, mission statement, founded year, denomination, the scripture verse shown on the homepage, and social links (YouTube, Facebook, Twitter/X). Also **Service times** — a list of day/time/label rows that drives the schedule shown on the homepage, the Events page, and the footer, so editing it here updates it everywhere at once.
- **Leadership team**: the list of leaders shown on the About page, in the order they appear in the list (drag to reorder). Each has Name, Role, Bio, an optional Tag (a short label shown next to their role), and an optional Photo. Leave Photo blank and the site just shows their name and text — no broken image icon.
- **Ministries**: a simple list of ministry Name + Description pairs.

## 4. A few things to know

- **The Contact page form is not part of this admin panel.** Messages people send through the "Send a message" form on the Contact page go to a separate Google Sheet, not to anything you'll see by logging in here. Ask David for access to that sheet if you need to see incoming messages.
- **Uploaded images and photos** land in `church-site/public/uploads/` in the site's code. That's normal — that's how the CMS stores them.
- **Deleting an entry** (sermon, event, announcement, gallery photo) removes it from the site immediately once saved. There's no "trash" to recover it from inside the CMS — if you're not sure, ask David before deleting rather than after.
- **If something looks broken after an edit**, it's almost always a typo or a field left in an unexpected format (like an unquoted colon in a text field breaking things behind the scenes) rather than the CMS itself being broken. Screenshot what you see and send it to David rather than trying to fix it by re-editing repeatedly.
- This admin panel only edits **content** (text, photos, dates). Colors, layout, and how pages look are code changes, not something available here — those go through David.
