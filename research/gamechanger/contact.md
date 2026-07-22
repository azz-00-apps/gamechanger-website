# Gamechanger Football — CONTACT / WAITING LIST

URL: https://www.gamechangerfootball.com/contact-us
Page title: WAITING LIST | Gamechanger Football
Screenshot: research/gamechanger/contact.png

(Note: this single page serves as the destination for the nav's "WAITING LIST" link, and every "BOOK NOW" / "GET STARTED" / "Enquire Now" / "Start Now" / "BOOK A TEST" CTA across the whole site — there is no separate contact page and waiting-list page; they are the same page/form.)

## Navigation (header)
Same as home.

## Heading / intro
Heading: **JOIN THE WAITING LIST**

> Please fill out the form below to make an inquiry, or alternatively contact;

- Email- info@gamechangerfootball.com (mailto link, subject "Gamechanger Football Enquiry")
- @Gamechanger_Football (Instagram handle) → https://www.instagram.com/gamechanger_football/
- Phone- 0450 871 406

## Form fields (verbatim labels, in order, with exact field types)

| Label | Field type | HTML name/id | Required |
|---|---|---|---|
| PLAYER NAME | text input | `player-name` | No |
| PLAYER AGE | text input | `player-age` | No |
| EMAIL | email input | `email` | **Yes** |
| PHONE NUMBER | tel input | `phone` | **Yes** |
| PLAYER INFO (CLUB, POSITION, EXPERIENCE ETC) | textarea | `textarea_comp-k6yub08e` | **Yes** |
| PROGRAM INTEREST | radio group (`comp-mji0d1ps`) | — | — |
| — option | 1 ON 1 TRAINING | | |
| — option | ELITE GROUP TRAINING | | |
| — option | STRENGTH AND CONDITIONING | | |
| — option | SPEED TRAINING | | |
| AREA OF TRAINING | radio group (`comp-mpynr9cr`) | — | — |
| — option | MACARTHUR | | |
| — option | LIVERPOOL | | |
| — option | BANKSTOWN | | |
| — option | AVAILABLE ACROSS MULTIPLE AREAS | | |

Submit button label: **send**
Post-submit confirmation text (verbatim): **Thanks for submitting!**

Form action: submits (GET) to `https://www.gamechangerfootball.com/contact-us` (Wix native form component, id `comp-k6yub031`).

## Below the form
> All athletes must abide by our rules and policies as outlined.

(References the same Rules and Policies PDF as on the Pricing page: `Gamechanger Football Rules and Policies.` — image alt text truncated without ".pdf" extension on this page, unlike the Pricing page.)

## Closing CTA band
Heading: GAMECHANGER FOOTBALL AND PERFORMANCE
CTA: **GET STARTED** → /contact-us (self-referential — the "Get Started" button on this page links back to itself)

## Footer — Locations
- Eagle Vale High School, Drysdale Street, Eagle Vale, NSW 2558
- Liverpool, NSW 2170
- Bankstown, NSW 2200

contact us: Mail info@gamechangerfootball.com (subject "Gamechanger Performance Enquiry" here vs "Gamechanger Football Enquiry" for the inline email link above — two slightly different mailto subject lines used across the site) | Tel 0450 871 406 (tel:+61 450 871 406)

## Media / images
2 decorative images with empty alt. Social icons: Facebook, Instagram, TikTok. One Rules and Policies PDF thumbnail/link.

## Notes / anomalies
- Confirms the site-wide pattern already seen on other pages: every CTA that isn't broken (Book Now, Get Started, Enquire Now on Football page, Waiting List, Book A Test) funnels to this exact same page/form — there is no differentiated "waiting list" experience vs. general contact/enquiry.
- Two different mailto subject lines are used inconsistently across the site for the same info@gamechangerfootball.com address: "Gamechanger Performance Enquiry" (footer, used on every page) vs. "Gamechanger Football Enquiry" (inline link on this page only).
