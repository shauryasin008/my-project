# Our Little World 💗

A scroll-based, handcrafted, super-cute anniversary experience.

- 🐻 Two original bear characters (A & B)
- 📜 29 pre-written notes, memories, letters, songs, time-capsule lists
- 💌 A 5-question playful quiz dropped in between the notes
- ✨ Random surprise animations while you scroll (peek, rain, butterflies, secret notes, balloons…)
- 🌅 A scroll-from-top-to-bottom emotional arc that ends in an anniversary reveal
- 🛠 **Admin panel** (username: `shaurya` / password: `shaurya`) to edit EVERYTHING live in the browser
- 📱 Mobile-first, works on iPhone, Android, tablets, desktop
- ♿ Keyboard + reduced-motion friendly
- 🚀 Deploys to Vercel in 30 seconds (purely static, no backend)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Vercel → New Project → Import repo → **Deploy**.
3. Done. No env vars needed.

## Admin

- Click the **admin** pill (top-right of the page after unlock).
- Login: `shaurya` / `shaurya`.
- Edit any note, memory, song, letter, time-capsule, quiz, the final message, the site title, dates, names — anything.
- All changes save to your browser (localStorage). To make changes permanent across devices, edit `src/data/content.ts`.

## Add your photos

Drop files into `public/images/`:

```
public/images/photo1.jpg
public/images/photo2.jpg
…
public/images/photo6.jpg
```

Any memory card in the admin that points to a missing file will show a graceful "add a photo" placeholder. The site never crashes.

## Add background music

Drop a file at `public/audio/music.mp3`. (The audio toggle is intentionally not autoplaying — the experience runs fine without music.)

## Notes

All pre-written content lives in `src/data/content.ts`. Every note, the quiz, the final message — all editable either there or in the in-browser admin.
