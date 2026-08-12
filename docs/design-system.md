# Picstagram Design System

How the Figma file is organised and the layout rules behind it. Tokens live in **[style-guide.md](./style-guide.md)**. Deliberate differences between design and code are tracked as **Task 6** in [TODO.md](./TODO.md).

## Figma file

**Social Media App Design** — four pages:

| Page | Width | Frames |
|------|-------|--------|
| Desktop | 1440×1024 | 32 (16 light + 16 dark) |
| Tablet | 768×1024 | 34 (17 light + 17 dark) |
| Mobile | 390×844 | 32 (16 light + 16 dark) |
| Components | — | shared + per-breakpoint components |

### Page structure

Every breakpoint page has the same shape, so they can be compared side by side:

- One **section per flow**, laid left to right: **Auth → Popular → Feed → Profile**.
- Each flow exists twice — a **Light row** and a **Dark row** beneath it, named `Feed — Light` / `Feed — Dark`.
- Within a section, the base view first and its **states stacked vertically** beneath it — empty state, other-user, popups, scrolled.
- Frames named by view and state: `Profile View – Other User`, `Feed View – Comments`. Tablet frames carry the width: `Profile View – 768`.

### Light and dark

Dark frames are **clones with the `Colours` collection set to its Dark mode** — not recoloured copies. Every fill is bound to a token, so a colour change updates both rows from one place. See [style-guide.md](./style-guide.md) for the tokens.

The duplication is deliberate, for side-by-side visibility. The cost is that **structural** edits must be made twice — variables cover colour, not layout. Only duplicate once a layout is settled.

## Breakpoints

- **1440** desktop · **768** tablet portrait · **390** mobile.
- Landscape tablet needs no frames — at ~1024 the 900px content column still fits with 62px margins, so the desktop design applies.
- Think in widths, not devices: a tablet in landscape is the same as a resized desktop window.

## Layout per breakpoint

| | Navigation | Grid | Forms |
|---|---|---|---|
| Desktop | Top header, search + nav + account | 900 column, 292 tiles / 12 gap | Centred modal over a scrim |
| Tablet | Same header, tighter spacing, search capped 220 | 720 column, 232 tiles / 12 gap | Centred modal over a scrim |
| Mobile | Bottom tab bar; top bar is logo + one icon | Full-bleed, 128.67 tiles / 2 gap | Full-screen view with close + title |

Mobile specifics: guest tab bar carries Popular · Log In · Sign up, member carries Feed · Popular · Profile. Search opens from a magnifier rather than sitting permanently in the bar. The top bar hides on scroll; the tab bar and an active search field do not.

## Components

On the **Components** page, grouped into sections:

- **Shared — edit with caution.** `Input`, `Button` (Primary/Secondary × Default/Hover), `PostCard`, `Comment`, `Reply`, `Explore Tile`, `Profile Picture`, `Nav Item / Feed · Popular · Log In · Sign up`, `Story` (Unviewed/Viewed/Own), `Suggested User` (Link/Button), `Suggestion Card`, `Switch` (On/Off). Used by every breakpoint.
- **Desktop.** `Header / Member`, `Header / Guest`, `Stories Tray / Desktop`, `Suggestions / Desktop`, `Suggestions / Empty Feed`.
- **Tablet.** `Header / Member – 768`, `Header / Guest – 768`, `Stories Tray / 768`, `Suggestions / 768`.
- **Mobile.** `Tab Bar / Member`, `Tab Bar / Guest`, `Top Bar / Mobile` (Right = Search / None / Menu), `Stories Tray / Mobile`, `Suggestions / Mobile`.

### Sharing rules

- Share across **views within a breakpoint** — that's what stops copies drifting.
- Never share **chrome** (headers, nav bars) **across breakpoints**; their space constraints genuinely differ, and fixing one width breaks another.
- Small building blocks may be shared across breakpoints, but only because they're built to resize: auto-layout with fill/hug, never absolute positions or fixed text widths.
- **Before changing anything in the Shared section, check what else uses it** and say so before editing.

### Responsive components

These reflow rather than scale, and depend on it:

- `PostCard` — vertical auto-layout; the image fills leftover height, so card height drives the image. 500×837 desktop, 390×716 mobile (keeping the 500:550 image ratio).
- `Comment` / `Reply` — fixed width with a filling content column, so body text wraps instead of overflowing.
- `Explore Tile` — hover scrim stretches, stats row centres via constraints.
- `Profile Picture` — placeholder head and shoulders scale with the frame.
- Header search field fills to a capped max width, so one header serves several widths.

## Patterns

- **Card vs modal.** A card sitting on the page gets a 1px `#DBDBDB` border; a modal gets none, because the scrim already separates it.
- **Anchored overlays.** Account menu and search dropdown sit flush under the header and align to the control that opens them — the search dropdown matches the field width, the account menu spans the avatar-to-username width.
- **Nav state.** Nav items carry `State` = Default / Hover / Active. Hover is `opacity 0.6`; active items don't dim, matching the CSS. Hover is wired as a prototype interaction, so it works in Presentation mode.
- **Empty states** are designed alongside populated ones, and kept coherent — a new account has no posts *and* no followers *and* no bio.

## Working practice

- Build from real content — photographs and plausible counts. Grey boxes hide alignment, contrast and wrapping problems.
- Measure from node values, not screenshots; optical gaps differ from raw spacing where items carry padding.
- Screenshot after each meaningful change — clipped text, off-centre content and unscaled icons only show up rendered.
