# Handing Over the Website

This is the starting point for anyone taking on responsibility for the Episcopal Diocese of Wanyjok website who isn't a developer. It covers getting access, who can do what, and where things live. For day-to-day content editing once you're in, see **[ADMIN-GUIDE.md](ADMIN-GUIDE.md)**.

## How this is built, in plain terms

The website's text, photos, sermons, and events all live as files in a GitHub repository (a project on github.com) — think of it as the filing cabinet the whole site is built from. A tool called Decap CMS gives you a normal-looking form-based editor at **/admin** that reads and writes those files for you, so you never see code. When a file changes, the live site rebuilds itself automatically within a minute or two.

Because of that, **"who can edit the website" is really "who has access to that GitHub project."** There's no separate login system for the admin panel — it's the same access either way.

## 1. Getting a GitHub account (for anyone new)

1. Go to **github.com** and click **Sign up**.
2. Enter an email address, create a password, and choose a username.
3. Verify the email address when GitHub sends the confirmation.
4. That's it — no payment info needed, this is free.

## 2. Getting admin access (someone who already has access does this)

Only someone who's already a collaborator on the repository can add a new person — a brand-new GitHub account can't grant itself access.

1. Go to **github.com/David-Okello/church-site**
2. Click **Settings** (top right of the repo page)
3. In the left sidebar, click **Collaborators and teams**
4. Click **Add people**, and type the new person's GitHub username or the email they signed up with
5. GitHub sends them an invitation — they need to accept it (by email link or from their GitHub notifications) before access becomes active

Once accepted, they can go to **church-site-27m.pages.dev/admin**, click **Login with GitHub**, and authorize the app the first time. From then on, logging in is one click.

## 3. Removing someone's access

1. Same page: **Settings → Collaborators and teams**
2. Find their name, click the **✕** or **Remove** action next to it
3. This takes effect immediately — they'll no longer be able to log into `/admin`

## 4. What editors can and can't do

Everyone with repo access has the same level of access — there's no "view only" or "sermons only" role. Anyone added can edit any part of the site's content: sermons, events, photos, page text, leadership, and settings. See **[ADMIN-GUIDE.md](ADMIN-GUIDE.md)** for exactly what each section covers.

What editors **can't** do through `/admin`: change colors, layout, or how pages look, or add new kinds of pages. Those are code changes and go through whoever's currently maintaining the code (David, until this is formally handed off further).

## 5. The contact form and its Google Sheet

The "Send a message" form on the Contact page does **not** go through GitHub or `/admin` at all — it's a separate, simpler system so messages don't sit in a public code repository. Every submission is added as a new row in a Google Sheet.

**To check messages:**
1. Open the Google Sheet (ask David for the link/access if you don't have it — it's shared by Google account, not by GitHub)
2. Each row is one message, with columns: **Received** (date/time), **Name**, **Email / Phone**, **Message**
3. New messages just appear at the bottom as they come in — there's currently no notification (email/SMS) when a new one arrives, so it needs to be checked periodically. This could be added later if it becomes a pain point — ask David.
4. Treat it like any spreadsheet: you can sort, filter, mark rows as handled with a note or color, or delete obvious spam. Nothing you do here affects the live website.

## 6. If something looks broken

- A typo or an oddly-formatted field is far more likely than the website being "down." Screenshot what you see.
- Check whether the change was made in `/admin` (content) or would require a code change (design/layout/new features) — that determines who can fix it.
- For anything beyond content edits, that's a developer task — currently David.
