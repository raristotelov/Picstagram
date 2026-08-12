# Tech Stack

Overview of the technologies used across Picstagram. Versions reflect the current `package.json` files.

## Frontend (`client/`)

- **Language:** JavaScript (JSX).
- **Framework:** React 19, bootstrapped with Create React App (`react-scripts` 5).
- **Routing:** `react-router-dom` 6.
- **State:** React Context (`LoggedInUserContext`) + hooks; JWT persisted in `localStorage`.
- **API calls:** native `fetch` wrapped in a custom `requester` service.
- **Auth (client):** `jwt-decode` to read the logged-in user from the JWT.
- **Styling:** plain CSS, one `.css` file per component; custom fonts (Pacifico, Mada, Vollkorn).
- **Utilities:** `uuid` for unique image identifiers.

## Backend (`server/`)

- **Runtime:** Node.js.
- **Framework:** Express 5.
- **Auth:** `jsonwebtoken` (JWT signing/verification), `bcrypt` (password hashing).
- **Config/middleware:** `cors`, `dotenv`.
- **Structure:** router → controllers → services → Mongoose models.

## Database

- **MongoDB** via **Mongoose** 8 (ODM). Runs locally (`mongodb-community`) or via MongoDB Atlas; connection string in `MONGODB_URI`.

## Image Storage

- **Cloudinary** — chosen for image uploads and on-the-fly optimization/resizing (unsigned client-side uploads).
- _Migration in progress:_ the code currently uploads to **Firebase Storage** (`firebase` SDK); Firebase is being replaced by Cloudinary. See [TODO.md](./TODO.md).

## Auth Model

- JWT-based. Server signs a token on login; client stores it in `localStorage` and sends it as the `X-Authorization` header. Protected routes verify it via `verifyJwtToken` middleware.

## Tooling

- **Client:** Prettier, ESLint (`react-app` config), Testing Library + Jest (via `react-scripts`).
- **Server:** ESLint, `nodemon` for dev reload.
