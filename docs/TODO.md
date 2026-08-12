# TODO

## Task 1 - Auth fixes

Issues found while tracing the login / sign-up flow.

### Critical
- [ ] **Re-enable password verification on login** — `server/src/services/userService.js` `login()` has the `bcrypt.compare` check commented out, so any password works for a known email.

### Important
- [ ] **Client error feedback** — `loginHandler` / `signUpHandler` don't catch failures; the user gets no message and navigation silently skips.
- [ ] **Validate `repeatPassword`** — collected on sign up but never checked against `password`.
- [ ] **Add input validation** — required fields, email format, password length.
- [ ] **Sanitize sign-up response** — server `signUp()` returns the full user document including the hashed password.

### Minor
- [ ] **Submit loading state** — disable the submit button / show a spinner while the request is in flight.
- [ ] **Dead logout line** — `App.jsx` removes `localStorage` key `dcbyte-jwt`, but the stored key is `jwt-token`; `setJwtToken(null)` already clears it.

## Task 2 - Upload / Image fixes

Issues found while tracing the upload-photo flow.

### Critical
- [ ] **Cancel button is dead** — `AddImagePostForm.jsx` never reads the `onCancelClick` prop from `ProfileView` (uses a local empty handler), so Cancel does nothing.
- [ ] **Silent empty submit** — `addImagePostHandler` returns early when no image is selected, with no user feedback.

### Important
- [ ] **No error feedback on failure** — upload/save errors are only `console.log`'d; the popup stays open with no message.
- [ ] **No loading/disabled state** — Submit isn't disabled during the async upload; a double-click can create duplicate posts.

### Minor
- [ ] **No file type/size validation** — any file can be selected and uploaded.
- [ ] **Orphaned uploads** — the image is uploaded to Cloudinary before the server save; if the save fails, the image is left in storage.
- [ ] **Unused variable** — `const result =` in server `addUserPost` is never used.
- [ ] **Remove dead Firebase code** — after the Cloudinary migration, `client/src/firebase.js` and the `firebase` dependency are unused.

## Task 3 - Seed data

Not built yet — make the app feel live for the portfolio. An `npm run seed` Node script using the Mongoose models (`User`, `UserImage`, `Comment`).

**Would populate:** ~6 demo users (bios + avatars stored as `UserImage` docs), follow relationships, ~15 posts (stock image URLs + captions + likes), ~40 comments (some with replies + likes).

**Decisions before building:**
- [ ] Wipe + reseed (clean, predictable state — deletes existing test data) vs. additive.
- [ ] A dedicated `demo` login account that follows all seed users, with a known password.
- [ ] Data volume.

**Notes:** stock URLs go straight into `imageUrl` (picsum for posts, pravatar for avatars) — no Cloudinary upload needed for seeds.

## Task 4 - Guest experience

Not built yet. Guests currently land on `/log-in` (`Router.jsx:20`), so recruiters hit a sign-up wall before seeing anything. Instead: land them on public content they can browse without an account.

**Approach:** Popular Posts becomes the public landing page (still available to logged-in users). Auth-gated actions prompt sign-in rather than being hidden, so the app reads as real-but-gated instead of crippled.

- [ ] Redirect `/` to `/popular-posts` for guests instead of `/log-in`.
- [ ] Make `/popular-posts` reachable without a JWT.
- [ ] Replace the hardcoded 24-item placeholder array in `PopularPostsView.jsx` with real posts from the server.
- [ ] Guest header variant — Log In / Sign up (the header already exists in the Login and Sign-up designs). The demo entry point goes here too, see Task 5.
- [ ] Guest post view: opening a post shows the comments popup read-only, with like / comment / follow replaced by a "Sign in to continue" prompt.

**Decisions before building:**
- [ ] How much guests see before logging in — Explore grid only, or also read-only post and profile views.

**Later:** cron/automation that has seed users post and comment on a schedule, so the platform keeps looking active.

**Note:** the Popular Posts page is due a redesign; the current layout is a placeholder.

## Task 5 - Demo account access

Not built yet, and **needs more thought before building.** A one-click "View as demo user" entry point so recruiters can see the authenticated half of the app — upload, edit profile, follow, own profile — without signing up.

**Leaning towards** an ephemeral user per visitor rather than a shared account:
- `POST /users/demo-login` creates a fresh user flagged `isDemo: true` and returns a JWT — no shared account, no credentials in the client bundle.
- The new user auto-follows the seed users so the feed is populated on first load; copy 2-3 posts onto their profile so it isn't empty.
- Exclude `isDemo` users from search, Explore and follower / following lists so they stay invisible to other visitors.
- Nightly cron deletes demo users older than 24h along with their posts, comments and likes.

Rejected — handing out a random seeded account: visitors would mutate content everyone else sees, and random selection doesn't guarantee two people get different accounts.

**Still to think about:** whether per-visitor users are worth the cost versus a shared account reset nightly; how the entry point is presented in the guest header.

**Depends on:** Task 3 — the seed users the demo account follows.

## Task 6 - Design / code sync

The Figma designs now deviate from the app in these places. All deliberate — apply when picking the code back up.

**Profile**
- [ ] Cap `bio` at 150 characters at the model level. Let it wrap to multiple lines; no visual truncation.
- [ ] `.profile-header` border `#B5B5B5` → `#C0C0C0`, `padding-bottom` 40 → 32, and 24px of space above the grid.
- [ ] Drop the avatar's `margin-left: 60px` so it aligns with the grid's left edge.
- [ ] Replace the 5px tile margins with a 12px grid gap; post tiles become 292px squares, matching Explore.
- [ ] Username Mada Bold 20 `#4B4B4B`; stats and bio 15px `#4B4B4B` with the numerals bold. The old `#B5B5B5` on `#F0F0F0` was ~1.8:1 contrast, well below WCAG AA.
- [ ] Replace `default-profile-picture.png` with an SVG — figure darker than the disc, not the current inverted knockout.

**Header**
- [ ] Logged-in username 18px → 15px.
- [ ] Remove `padding: 2px 10px` from `.navigation-item-text`; it widens every nav gap by 10px a side. Needs a replacement hit area (pseudo-element or negative margin).

**Button**
- [ ] Add a secondary type — transparent fill, red border, red label — and use it for Cancel, Edit Profile and Unfollow.
- [ ] Label 18px → 15px.

**Mobile-specific**
- [ ] Posts run full-bleed on mobile: no corner radius, no side borders, an 8px strip of page background between them. The rounded card stays on desktop and tablet.
- [ ] Post image keeps the desktop 500:550 ratio at every width — 390×716 on mobile, not 390×837. A whole post with its metadata should fit between the bars.
- [ ] Grids are full-bleed on mobile (3 columns, 2px gutters) and a centred column elsewhere.

## Task 7 - Designs still to produce

Everything else is designed across all three breakpoints in light and dark. These three are not, and each needs frames before it can be built.

- [ ] **Guest post view** — a guest opening a post from Explore sees the post with its comments read-only, and like / comment / follow replaced by a "Sign in to continue" prompt. Needed at all three breakpoints. Blocks Task 4.
- [ ] **Demo access entry point** — where "View as demo user" actually sits. Discussed as the guest bottom bar on mobile and the guest header on desktop, but never drawn. Blocks Task 5.
- [ ] **Story creation** — posting a story. Would reuse the upload form, but has no frame; also undefined is whether it's a separate flow or a mode of the existing upload.

## Decisions to discuss

Open questions that shape implementation. None are blocked on design.

- [ ] **How much guests see** — Explore grid only, or also read-only post and profile views. (Task 4)
- [ ] **Demo account shape** — ephemeral user per visitor vs a shared account reset nightly. (Task 5)
- [ ] **Feed view as a presentation mode.** Agreed in principle: clicking a post shows that *set* of posts in the feed layout — popular posts from Explore, a user's posts from their profile. The routing and state approach was deferred.
- [ ] **Popular ranking.** Undefined. Suggested most-liked within a recent window so the grid keeps changing; all-time likes would freeze the same posts.
- [ ] **Story expiry mechanics** — TTL index vs cron, and how seeded stories regenerate so the app doesn't look dead.
- [ ] **Suggestions ranking**, and whether a people-discovery screen ever exists. Currently rejected, which is why there's no "See all".
- [ ] **Task 3's demo-account line** is superseded by Task 5 and should be struck once Task 5 is settled.

---

## Status

_Last updated 2026-08-08._

**Currently working on**
- Nothing mid-flight. The design phase is complete; no code has changed since the comments feature, which still needs a **server restart** to pick up the `/comments` routes and a test.

**Recently done**
- **Design complete across three breakpoints** — 42 frames: Desktop (1440), Tablet (768) and Mobile (390), each with Auth, Popular, Feed and Profile sections. Landscape tablet reuses the desktop frames.
- **Componentised** the header and navigation: `Header / Member` and `Header / Guest` (plus tablet copies), `Nav Item` sets with Default / Hover / Active, mobile `Top Bar` and `Tab Bar`, `Explore Tile`, `Profile Picture`, `Button` with Primary / Secondary.
- **New screens designed** — Explore (guest and member), search with a user-results dropdown, the account menu, and mobile-specific patterns: bottom tab bar, full-bleed grid, full-screen forms, comments as a bottom sheet.
- **Made components responsive** — PostCard, Comment and Reply now reflow by width rather than being fixed.
- **Docs rewritten** — [design-system.md](./design-system.md) and [style-guide.md](./style-guide.md) now describe the real file, including contrast ratios and the header spacing rule.
- Earlier: **captions** and the **comments feature** end-to-end.

**Next steps**
1. Work through **Task 6** — bring the code in line with the design (profile divider, avatar alignment, tile sizing, type scale, secondary button, header sizes).
2. Build the **seed data** script (Task 3).
3. Then **Task 4** (guest experience) and **Task 5** (demo access), which depend on the seed data.
4. Work through the remaining **Auth / Upload** fixes above.
