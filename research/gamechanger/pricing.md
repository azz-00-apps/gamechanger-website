# Gamechanger Football — PRICING

URL: https://www.gamechangerfootball.com/pricing
Page title: PRICING | Gamechanger Football
Screenshot: research/gamechanger/pricing.png

## Navigation (header)
Same as home.

## Hero
Heading: **PRICING**

> We offer a large variety of services, times and prices to suit your needs. Ranging from 1 on 1 sessions to bigger groups, now is the perfect time to get involved with Gamechanger! For any of the listed sessions below click 'enquire now' or message us on instagram to get started.

> *Rates vary depending on coach*

CTA label present: **ENQUIRE NOW** (see Notes/anomalies — not a working link on this page)

## Pricing cards (verbatim, 6 cards in a 3x2 grid repeater)

### FOOTBALL 1 on 1
> Sharpen your tools with elite coaches! Invest in your game and reap the rewards.

**Price: From $70 for 45mins**

### FOOTBALL (PRIVATE GROUP)
> Get your friends involved, train with us and develop your game in a competitive space.

**Price: From $50pp for 45mins**

### FOOTBALL (SMALL GROUP)
> Join us and other local players in the area in developing your game in a fun, hard working quality group environment!

**Price: From $50pp for 60mins**

### SPEED AND AGILITY
> Become the complete athlete. Take your on field performance to the next level by mastering your athletic qualities with our speed and agility groups.

**Price: From $50 for 1hr**

### S&C- Supervised Weekly Sessions
> Weekly 1 hour S&C sessions tailored to you at the world class Gamechanger HQ at Eagle Vale. Personalised and tailored to your injury history, age, position and workload, with a qualified and elite coach with you every step of the way.

**Price: $70 per week**

### S&C- DIY Gym Program
> A personally designed gym program tailored to your gym equipment/ gym availability. Specific to your age, history, position and workload. Program is updated every month to ensure progress is being made.

**Price: [MISSING — see Notes/anomalies below]**

## Rules and Policies
> Click to view our rules and policies, applying to ALL ATHLETES that train with us

Link (working): **Gamechanger Football Rules and Policies.pdf** → https://www.gamechangerfootball.com/_files/ugd/5f2f06_a0680ae90bcc4ff095f64b2f1ad17451.pdf (opens in new tab)

> By training with us, all players & parents agree to our rules and policies.

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
2 decorative images with empty alt. Named images: `1.png`, `1B8A9558.JPG`, `409a3087-55b4-45f1-9b2a-b996cefe5206.jpg`, `7b707ce1-bdc9-4ae6-9f16-3359784c878d.jpg`, `IMG_3688.JPG`, `aa44fb66-98b7-474c-8999-bb0582a3914e.jpg`, plus the Rules and Policies PDF thumbnail. Social icons: Facebook, Instagram, TikTok.

## Notes / anomalies (CONFIRMED — this is the known broken pricing-card repeater bug)
1. **The "S&C- DIY Gym Program" pricing card is missing its price entirely.** Verified at the DOM level: every other of the 6 repeater cards (`.wixui-repeater__item`) has exactly 3 rich-text spans (title / description / price, e.g. "FOOTBALL 1 on 1" → description → "From $70 for 45mins"), but the DIY Gym Program card has only 2 spans (title + description) with no price span at all — not an empty/blank price, the element itself is absent from that repeater item's data. This needs a real price added when rebuilt (client should supply this figure — it is not visible anywhere else on the live site).
2. **The top "ENQUIRE NOW" CTA is not a functional link.** Confirmed via DOM: the span containing "ENQUIRE NOW" has no `<a>` ancestor and no href/click handler — it renders as a button but does nothing when clicked. This mirrors the same broken-CTA pattern found on the Video Analysis page ("Start Now" / "Book a Session"). Only the generic footer "GET STARTED" button at the bottom of the page works.
3. The Rules and Policies PDF link, by contrast, **does work correctly** — it's an image-wrapped `<a>` linking out to a hosted PDF (`.../ugd/5f2f06_a0680ae90bcc4ff095f64b2f1ad17451.pdf`), confirmed via DOM inspection, not a bug.
4. Card layout itself (3-column, 2-row grid) renders correctly and consistently — the "S&C- Supervised Weekly Sessions" card is taller (667px vs 577px for others) simply because it has more description text, not a layout break.
