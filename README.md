# 🐉 Pixi Mini Game

An interactive mini-game built with **Pixi.js**, where the player must defeat dragons within a time limit. The game includes levels, animations, sound effects, pause functionality, a time booster, and a final victory screen.

## 🚀 Demo

👉 [Play Online (Netlify)](https://dragonignis.netlify.app/)

---

## 📦 Installation & Run

```bash
git clone https://github.com/Eugene-36/pixi-mini-game.git
cd pixi-mini-game
npm install
npm run start
```

The game will open in your browser at: `http://localhost:8081/`

---

## ⚙️ Build

```bash
npm run build
```

The compiled files will appear in the `/dist` directory.

---

## 🌍 Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import from Git"**
3. Choose GitHub and connect your repository
4. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

---

## 🛠 Tech Stack

- [PixiJS](https://pixijs.com/) v8
- TypeScript
- Webpack 5
- Howler.js (for sound)
- Netlify (deployment)

---

## 📁 Project Structure

```
public/
├── assets/             # media files
├── index.html          # markup
├── style.css           # styles
src/
├── core/               # Game.ts (entry point)
├── entities/           # Enemy.ts (enemy configuration)
├── managers/           # EnemyManager.ts, LevelManager.ts, SoundManager
├── scenes/             # scenes: MainMenu, LevelScene
├── ui/                 # buttons, win screen, etc.
├── utils/              # helpers (createText, buttons, etc.)
└── index.ts            # game launcher
```

---

## 🧪 Features

- ⏸ Pause
- ⏳ Time booster
- 🔇 Sound toggle
- ⭐ Level score (1–3 stars)
- 🏆 Final victory screen
- 🗡 Custom sword cursor
- 🎵 Sounds: win, lose, click, background

---

✅ Compatibility

Cross-browser tested. The game works reliably in:

- Google Chrome  
- Mozilla Firefox  
- Opera  
- Safari  

---

⚙️ Important Note About PixiJS Application

This project uses PixiJS v8.9.2 and initializes the game via:

```ts
const app = new Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
```

You may see a TypeScript warning that `Application` is marked as deprecated. This is related to PixiJS preparing for version 9, where `Application.init()` will be introduced.

🔒 However, in version v8.9.2 used in this project, `init()` does **not** exist — and `new Application()` remains valid and officially supported.

---

## 👨‍💻 Author

**Eugene** – [GitHub](https://github.com/Eugene-36)

---

## 📜 License

MIT License