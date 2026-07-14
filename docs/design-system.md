# Picstagram Design System

Source of truth for brand tokens and the Figma design approach. Values mirror the client CSS.

## Tokens

Colors, typography, radii, and borders are the single source of truth in **[style-guide.md](./style-guide.md)**. This doc covers the Figma build approach and page conventions.

## Figma File

**Social Media App Design** — three 1440×1024 desktop artboards (laptop target): Login, Sign Up, Home.

### Approach

- **Manual build from code** — no published Figma design system existed, so frames were built with `use_figma` using the tokens above (hardcoded, not variables).
- **Reusable components** (kept left of the artboards): `Input` (450×44, 12px radius, 16px placeholder), `Button` (120×40 pill), `PostCard` (500px, 12px radius). Edit the component to update every instance.
- **Icons** imported as SVG straight from `client/src/components/icons` (house, flame, heart, comment, arrow, logout) so they match the app exactly.
- **Images** are gray placeholder fills — the Plugin API can't fetch external URLs; swap for real images when needed.
- **Header** = fixed 54px bar, white, 1px `#C0C0C0` bottom border. Active tab underline is 2px `#F64D4D` flush to the bottom border. Guest header (Login/Sign Up) shows logo + Log In/Sign up links; logged-in header (Home) adds search, Feed/Popular nav, avatar, logout.

### Conventions

- Auth card: 600×800, white `#FFFFFF` fill (a raised surface on the `#F0F0F0` canvas, same as the header), 12px radius, 1px `#DBDBDB` border, logo + top-divider form, content top-aligned.
- Auth form text roles: heading + body text `#4B4B4B`; the clickable word ("Sign up" / "Login") in brand red `#F64D4D`; input placeholders stay muted `#B5B5B5`. Brand red is reserved for interactive accents, not applied to all text.
- Inputs: 12px radius (matches Instagram's `--ig-input-border-radius`). Button: pill (20px radius on 40px height).
- Post card: 500px wide, 12px radius, 1px `#DBDBDB` border; image 500×550; like / comment / add-comment rows divided by inset 1px `#E4E4E4`.
- When editing, prefer changing a component or a token here first, then reflect it in the client CSS (or vice versa) to keep design and code in sync.
