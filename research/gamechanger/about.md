# Gamechanger Football — ABOUT

URL: https://www.gamechangerfootball.com/about
Page title: ABOUT | Gamechanger Football
Screenshot: research/gamechanger/about.png

## Navigation (header)
Same as home: GAMECHANGER football and PERFORMANCE | ABOUT | FOOTBALL | STRENGTH AND CONDITIONING | SPEED AND AGILITY | OUR COACHES | LOCATIONS | SCHOOL HOLIDAY CAMPS | FACILITY | VIDEO ANALYSIS | TESTING | PRICING | WAITING LIST (→ /contact-us) | Log In

## MY STORY
Heading: **MY STORY**

Body copy (verbatim):
> From the A-Leagues, national teams and Europe, as well as working with Olympic athletes and the best coaches in the country, Gamechanger Football provides incredible lessons for our athletes in both the football and high performance space.

CTA: **Enquire Now** → /contact-us

## FOOTBALL (experience section)
Eyebrow: experience
Heading: **FOOTBALL**

Body copy (verbatim):
> With 19 years of playing experience, Brodie Clarkson has spent significant time in elite environments, including within the professional game both in Australia and overseas. He currently plays NSW NPL Men's First Grade with St George City FA — the second-highest level in Australian football — and has previously represented some of the country's top programs and clubs.

**Career Highlights & Achievements** (list, verbatim, in order):
- A-League Men's player – Macarthur Bulls
- Western Sydney Wanderers Youth Academy
- Canberra United National Youth League Player of the Season
- Australian Schoolboys Captain – toured Europe facing world-class opposition
- NSW (Emerging Socceroos) representative and national champion in both Football & Futsal
- National Schoolboys Player of the Tournament (MVP)
- Time with Belgian and Dutch first-division clubs KVC Westerlo and Excelsior Rotterdam
- Westfields Sports High School High-Performance Program graduate
- Recipient of the Combined High Schools "Blue" Award for outstanding sporting achievement
- Multiple selections in NPL Team of the Week

Closing line:
> Brodie uses these experiences to educate and prepare athletes in all areas of football excellence — mental, physical, technical, and tactical — ensuring each player is ready to meet the demands of high-level performance.

CTA: **More Info** → /football

Logos displayed alongside (club/org crests, per image inventory): Australian Government logo, Canberra United FC logo, Excelsior Rotterdam logo, Westfields Sports High School logo (mshs_logo), KVC Westerlo logo, plus miscellaneous screenshots/unlabeled images.

## STRENGTH AND CONDITIONING (experience section)
Heading: **STRENGTH AND CONDITIONING**

Body copy (verbatim):
> With over 15 years in football, Brodie has gained experience across elite environments under some of the best strength and conditioning coaches and high-performance programs. He has worked within world-leading systems, including Westfields Sports High School's High Performance Program, both as a student and sports science intern — a program known for producing elite talent such as Aaron Mooy, Maty Ryan, Sam Silvera, Ellie Carpenter, and Harry Kewell.

> He also spent time at the NSW Institute of Sport, learning from world-class coaches responsible for developing Olympic gold medallists like Ian Thorpe, and at Matraville Sports High School, an environment that has produced elite athletes including Adam Reynolds and Josh Addo-Carr.

> These experiences have given Brodie a deep understanding of how to help athletes reach peak performance through detailed, evidence-based, high-quality training. He currently is the lead strength and conditioning coach at Eagle Vale High School.

**Qualifications & Experience:** (list, verbatim, in order):
- ASCA Level 1 Certified Strength & Conditioning Coach
- Bachelor of Strength & Conditioning (currently completing)
- Strength & Conditioning Coach – Eagle Vale Sports High School
- Private Athletic Development Coach
- NSW Institute of Sport – Sports Science Intern
- Westfields Sports High – Sports Science Intern
- Matraville Sports High – Sports Science Intern
- CPR & First Aid Certified

CTA: **More Info** → /strength-and-conditioning

Logos displayed alongside (per image inventory): Basketball NSW (BNSW) image, NSWIS colour logo (NSW Institute of Sport), ASCA full logo (Australian Strength and Conditioning Association).

## Closing CTA band
Heading: GAMECHANGER FOOTBALL AND PERFORMANCE
CTA: **GET STARTED** → /contact-us

## Footer — Locations
Heading: LOCATIONS
- Eagle Vale High School, Drysdale Street, Eagle Vale, NSW 2558
- Liverpool, NSW 2170
- Bankstown, NSW 2200

Footer heading: contact us
- Mail: info@gamechangerfootball.com
- Tel: 0450 871 406

## Forms
No forms present on this page (`$B forms` returned `[]`).

## Media / images
7 decorative images with empty `alt=""`. Named/labeled images are almost entirely partner/club/institution logos supporting the career-highlights copy: `Australian-Government-logo.png`, `BNSW-Website-Image-Size.png`, `Canberra_United_FC_logo.svg.png`, `Excelsior_Rotterdam_logo_2002.svg-2.png`, `NSWIS-colour-logo.png`, `asca-full-logo.jpg`, `koninklijke-voetbal-club-westerlo-k-v-c-westerlo-logo-...png`, `mshs_logo_1447379665999_m.png`, plus a couple of generically-named screenshots/unlabeled files (`Screen Shot 2024-01-18...png`, `Screen Shot 2024-12-17...png`, `Unknown-2.png`, `i.png`, `IMG_1755.JPG`). Social icons: Facebook, Instagram, TikTok.

## Notes / anomalies — video embed check
Investigated specifically for the reported "Meet the Owner" broken video embed. Findings on this page and the home page (where the "Meet the Owner"/Brodie Clarkson bio block actually lives, linking here via "learn more"):
- **This About page has zero `<video>` or `wix-video` elements** — the "MY STORY" / career-highlights content here is text + logo images only, no video embed of any kind.
- On the **home page**, the "About / Gamechanger" section (above the "Meet the Owner" text block) contains one large background `wix-video` (864×1101, src `https://video.wixstatic.com/video/5f2f06_9ace0ee6ac1e49d4b368672d6b3a8364/1080p/mp4/file.mp4`) that loads and plays correctly (readyState 4, no error) — this is a generic training-footage background video, not a "Meet the Owner" personal video, and it works fine.
- On the home page's testimonials section, two portrait click-to-play `wix-video` embeds (Lachie Rose; a "PRO FOOTBALLERS" slot currently showing Jed Drew, Macarthur Bulls FC/Australian Youth International) render their poster thumbnails correctly but have empty `src`/`readyState 0` until clicked — this is standard Wix lazy-load-on-click behavior, not an error state, and visually they display fine (poster images load, play-button affordance present).
- **Could not locate any video specifically broken or specifically tied to "Meet the Owner"** on either page as described. Flagging this discrepancy rather than asserting a bug I could not reproduce — worth a manual re-check by the user in case it's browser/session-specific or intermittent.
