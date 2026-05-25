# Simran Kaur — Portfolio

> Creative Operations & Brand Support Professional

A luxury-aesthetic React portfolio built with Vite.

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 18 |
| Vite | 5 |
| @vitejs/plugin-react | 4 |

No external CSS frameworks — all styles are self-contained inside `src/Portfolio.jsx` via an injected `<style>` block, keeping design co-located with markup.

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18  
- **npm** ≥ 9 (comes with Node)

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000) with hot-reload.

### 3. Build for production
```bash
npm run build
```
Output lands in `dist/`.

### 4. Preview production build locally
```bash
npm run preview
```

---

## Project Structure

```
simran-portfolio/
├── public/
│   └── favicon.svg          # Gold "SK" monogram favicon
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Root component
│   ├── index.css            # Global CSS reset
│   └── Portfolio.jsx        # All sections + styles
├── index.html               # Vite HTML shell
├── vite.config.js           # Vite configuration
├── package.json
├── .gitignore
└── README.md
```

---

## Customisation

### Swap the portrait photo
In `src/Portfolio.jsx`, find the `IMG` object near the top and replace the `portrait` URL:
```js
const IMG = {
  portrait: "https://your-image-url.com/photo.jpg",
  // ...
};
```

### Add your own project images
Replace any of the `p1hero`, `p1a`, `p1b` … `p9hero` … URLs in the same `IMG` object.

### Update contact details
Search for `simrankaursohal131@gmail.com` and `+91 98882 30350` and replace with your own.

### Toggle dark mode default
In the `Portfolio` component, change the `useState` initial value:
```js
const [dark, setDark] = useState(true); // start in dark mode
```

---

## Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the dist/ folder into Netlify's deploy UI
# — or connect your Git repo and set build command to: npm run build
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
# Add to vite.config.js: base: '/your-repo-name/'
npm run build && npm run deploy
```

---

## License
Personal portfolio — all rights reserved by Simran Kaur.
