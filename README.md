# 🐉 Pixi Mini Game

Интерактивная мини-игра на **Pixi.js**, где игроку нужно уничтожать драконов на время. Реализованы уровни, анимации, звуковые эффекты, пауза, бустер времени и финальный экран победы.

## 🚀 Демо

👉 [Играть онлайн (Netlify)](https://dragonignis.netlify.app/)

---

## 📦 Установка и запуск

```bash
git clone https://github.com/Eugene-36/pixi-mini-game.git
cd pixi-mini-game
npm install
npm run start
```

Игра откроется в браузере по адресу: `http://localhost:8081/`

---

## ⚙️ Сборка

```bash
npm run build
```

Собранные файлы появятся в директории `/dist`.

---

## 🌍 Деплой на Netlify

1. Зайди на [https://app.netlify.com](https://app.netlify.com)
2. Нажми **"Add new site" → "Import from Git"**
3. Выбери GitHub и подключи репозиторий
4. Укажи:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Жми **Deploy site**

## 🛠 Стек технологий

- [PixiJS](https://pixijs.com/) v8
- TypeScript
- Webpack 5
- Howler.js (для звуков)
- Netlify (деплой)

---

## 📁 Структура проекта

```
src/
├── assets/             # медиафайлы
├── core/               # Game.ts (точка входа)
├── scenes/             # сцены: MainMenu, LevelScene
├── ui/                 # кнопки, экраны победы и т.д.
├── utils/              # хелперы (createText, кнопки и пр.)
└── index.ts            # точка запуска игры
```

---

## 🧪 Функциональность

- ⏸ Пауза
- ⏳ Бустер времени
- 🔇 Вкл/выкл звука
- ⭐ Оценка за уровень (1–3 звезды)
- 🏆 Финальный экран победы
- 🗡 Кастомный курсор-меч
- 🎵 Звуки победы, поражения, клика, фон

---

---

✅ Особенности

Кроссбраузерность подтверждена: игра протестирована и стабильно работает   в:

Google Chrome

Mozilla Firefox

Opera

Safari

---

---

⚙️ Важное замечание про PixiJS Application

Проект использует PixiJS v8.9.2, и инициализация игры выполнена через:

const app = new Application({ width: 800, height: 600, backgroundColor: 0x1099bb });

В TypeScript может появиться предупреждение, что Application помечен как deprecated. Это связано с подготовкой PixiJS к версии 9, где планируется использовать Application.init().

🔒 Однако в версии v8.9.2, используемой в этом проекте, метод init() не существует, и new Application() остаётся корректным и официально поддерживаемым методом.

---

## 👨‍💻 Автор

**Eugene** – [GitHub](https://github.com/Eugene-36)

---

## 📜 Лицензия

MIT License
