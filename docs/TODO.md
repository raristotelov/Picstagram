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

---

## Status

_Last updated 2026-07-14._

**Currently working on**
- Nothing mid-flight — the comments feature was just completed. It needs a **server restart** to pick up the new `/comments` routes, then a test.

**Recently done**
- Figma designs for the feed, post-card state variants, comments popup, and replies.
- **Captions** end-to-end (model field → service → upload form → handler → display).
- **Comments feature** end-to-end: `Comment` model + service + `/comments` API (add, fetch with nested one-level replies, like/unlike), real `commentsCount` on feed posts, and full client wiring (fetch/post comments, like, reply, view replies).

**Next steps**
1. Apply the **post-card redesign** to the code (rounded card, combined stats row, muted counts, caption + preview-comment layout, Post button, lucide comment icon) — this also fixes the 30px comment-text bug.
2. Build the **seed data** script (Task 3).
3. Work through the remaining **Auth / Upload** tasks above.
