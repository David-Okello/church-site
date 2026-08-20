# Using the Website Admin Panel

This guide walks through adding and editing content on the Episcopal Diocese of Wanyjok website. No coding needed — everything here happens through a form in your browser.

## 1. Log in

1. Go to **https://dow-anglican.org/admin**
2. Click **Login with GitHub**
3. The first time, GitHub will ask you to authorize the app — approve it
4. You'll land on the admin dashboard, with a list of content sections on the left

You need a GitHub account with access to the `David-Okello/church-site` repository to log in. If you don't have one yet, ask David to invite you.

## 2. How saving works

There's no separate "publish" button hiding behind a delay. When you click **Save** (or **Publish**, depending on the section), your change is written straight to the website's source code and the live site rebuilds automatically — it's usually live within a minute or two. There's no draft/review step, so double-check what you typed before saving.

If two people edit the same entry at the same time, whoever saves second can overwrite the other's change. It's rare, but worth being aware of if more than one of you is adding content in the same sitting.

As you type, the panel on the right shows a preview styled to roughly match the real site (fonts, colors, photo banners) — for Sermons, Events, Announcements, Photo Gallery, and every entry in "Pages." It won't be pixel-perfect (it's a simplified version, not the actual page), but it should make it obvious whether what you typed reads the way you intended before you save. Church Settings doesn't have a styled preview — it's plain form fields, since there's no single "page" for it to preview.

## 3. The sections

The left-hand menu has these sections:

- **Sermons**
- **Events**
- **Announcements**
- **Photo Gallery**
- **Pages** (the big photo and headline at the top of every page — Homepage, About, Sermons, Events, Gallery, Give, Contact)
- **Church Settings** (Site settings, Leadership team, Ministries)

Sermons, Events, Announcements, and Photo Gallery are **collections** — click into one, then **New [item]** to add another entry, or click an existing entry to edit it. Pages and Church Settings are **single documents** — there's only one "Homepage," one "Site settings," and so on, and you're editing that one document directly.

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

### Pages

Every field a page needs lives here — not just the big hero photo and headline, but every section's small label ("kicker"), heading, and paragraph, all the way down each page. Fields are listed in the same order the sections appear on the actual page, and each is prefixed with which section it belongs to (e.g. "Announcements section: heading") so it's clear what you're changing before you change it.

- **Homepage**: the longest entry — hero photo and text, then a field or two for every section down the page (Sermons, Schedule, Ministries, the Bishop's photo and quote label, Announcements, Events, the Scripture kicker), then the closing heading/subtext.
- **About page**: hero photo and opening statement, the Story paragraphs, the six "Our core values" cards (title + description each, add/remove/reorder freely), the diocesan department tiles (a simple list, add or remove departments as they're created), the Leadership section intro text, the Ministries section intro text, and the closing heading/text.
- **Sermons page**, **Events page**, **Gallery page**, **Contact page**: hero photo, kicker, title, subtext, plus a couple of extra fields specific to that page (e.g. the Sermons page's "Recordings coming soon" notice box, the Contact page's card headings).
- **Give page**: hero photo, hero text, the paragraph explaining why giving matters, the three "Ways to give" cards (each can optionally show a "Chat on WhatsApp" button instead of a "Contact us" link — that's the checkbox on each card), the four "What your support enables" tiles, and the closing heading/text.

Every **photo** field works the same way: click it, then **Choose an image** to upload a new one or pick from photos already uploaded. There's no special size to aim for; a normal landscape photo from a phone works fine.

Two things worth knowing:
- The **Gallery page**'s hero photo (in this "Pages" section) is the one big photo at the very top of the Gallery page. The dozens of smaller photos in the grid below it come from the separate **Photo Gallery** section, not from here.
- The About page's diocesan org chart (Bishop → Provost / Administrative Secretary → their direct reports) is *not* editable here — that reporting structure essentially never changes, so it stays fixed in the site's code. The **department tiles** below it (Finance, Health, Education, etc.) *are* editable, since new departments do get created over time.

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
