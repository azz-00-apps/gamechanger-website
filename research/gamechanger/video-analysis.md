# Gamechanger Football — VIDEO ANALYSIS

URL: https://www.gamechangerfootball.com/general-9
Page title: VIDEO ANALYSIS | Gamechanger Football
Screenshot: research/gamechanger/video-analysis.png

## Navigation (header)
Same as home.

## Hero
Heading: **VIDEO ANALYSIS**
> Tailored 1 on 1 video analysis to expand your knowledge of the game. See what the footage reveals, and take advantage of professional insight. Individual feedback. Real improvement.

CTA label present: **Start Now** (see Notes/anomalies — not a working link on this page)

## Individual Analysis
Heading: **INDIVIDUAL ANALYSIS**

> At Gamechanger Football & Performance, we help players see their game like the pros.

> Through individualised football video analysis, we break down every key moment — decision-making, positioning, and technical execution — so players can train smarter, not just harder.

> Based in Sydney's Macarthur region, our performance analysis sessions are used by players from grassroots to NPL and A-League level.

### How It Works
- You upload / send us your match footage.
- We deliver a detailed review — online or in-person — focused on your position, habits, and development goals.
- We show you exactly what happened, why it happened, and how to improve.
- Each session gives you clear feedback, key takeaways, and a simple action plan for the next game.

### What We Cover
- Positioning & Awareness – improve movement and game reading
- Decision Making – recognise better options under pressure
- Technical Execution – refine passing, touch, finishing, and defence
- Tactical Understanding – see how you fit within your team's structure
- Work Rate & Consistency – track effort and improvement over time

### Why It Works
> You can't fix what you don't see.

> With Gamechanger's video analysis coaching, players develop faster, gain confidence, and understand the game like professionals.

> It's not just watching your footage — it's learning from it.

### Book a Session
> Take your football to the next level.

> Book a Gamechanger Video Analysis session today — and start turning your match footage into progress.

(Label present: "Book a Session" — see Notes/anomalies — not a working link on this page)

## Closing CTA band
Heading: GAMECHANGER FOOTBALL AND PERFORMANCE
CTA: **GET STARTED** → /contact-us

## Footer — Locations
- Eagle Vale High School, Drysdale Street, Eagle Vale, NSW 2558
- Liverpool, NSW 2170
- Bankstown, NSW 2200

contact us: Mail info@gamechangerfootball.com | Tel 0450 871 406

## Forms
No forms present on this page.

## Media / images
5 decorative images with empty alt. One named user-uploaded photo: `IMG_6558.jpg`. Social icons: Facebook, Instagram, TikTok.

## Notes / anomalies
- **"Start Now" (hero) and "Book a Session" (bottom section) are NOT functioning links/buttons on this page** — confirmed via DOM query (`document.querySelectorAll('a')` filtered for this text returns zero matches). Both read as clickable CTA-styled text/headings but have no `href` or click handler, unlike every other page's "Start Now"/"Enquire Now" CTAs which do link to `/contact-us`. Only the generic footer "GET STARTED" button at the bottom of the page actually works. This is a real conversion-path bug worth flagging and fixing in the rebuild.
