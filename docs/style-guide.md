# Style Guide

Canonical reference for design tokens — colors, typography, radii, borders, spacing, elevation. This is a living doc; sections are filled in as the design evolves. Values mirror the client CSS / Figma.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Red | `#F64D4D` | Logo, active nav (text + underline), liked heart, primary button, link accent word |
| Page Background | `#F0F0F0` | App canvas behind every page |
| Surface | `#FFFFFF` | Header, cards, inputs, buttons — every raised surface |
| Text / Icon | `#4B4B4B` | Primary UI text, nav labels, icon strokes |
| Muted | `#B5B5B5` | Input borders, placeholder text |
| Card Border | `#DBDBDB` | 1px border on cards (post card, auth cards) |
| Divider | `#E4E4E4` | Inset dividers inside cards (post rows, auth form divider) |
| Header Border | `#C0C0C0` | Header bottom border |
| Logout Icon | `#141414` | Logout glyph stroke (code only) |
| Image Placeholder | `#D9D9D9` | Empty image/avatar fills in Figma before real photos |

**Rule:** brand red is reserved for identity + interactive/active accents — not applied to body text.

## Typography

- **Pacifico** (Regular) — logo wordmark only. 26px in header, 40px on auth cards.
- **Mada** — all UI text. Regular for body/inputs/headings; Bold for nav labels, usernames, like/comment counts.
- Sizes: auth heading 26px · link text 20px · nav text link 18px · post username 15px · like/comment count 15px · input placeholder 16px · add-comment 16px · search 14px · nav icon label 12px.

## Corner Radii

- Inputs: 12px
- Buttons: pill (20px radius on 40px height)
- Cards (post card, auth cards): 12px
- Search box: pill (17px radius on 34px height)

## Borders & Dividers

- Card border: 1px `#DBDBDB`
- Input border: 1px `#B5B5B5`
- Header bottom border: 1px `#C0C0C0`
- Inset dividers (post rows, auth form): 1px `#E4E4E4`
- Active nav underline: 2px `#F64D4D`

## Spacing

_To fill in as we go._

## Elevation / Shadows

_None yet — cards use a 1px border, not a shadow. To revisit if we move to shadowed cards._
