## Usage Guide

This guide shows how to install, run, configure, and embed the Circle Stack animation.

### Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173` (or the port shown) to view the app.

### Production build
```bash
npm run build
npm run preview
```

### Quick start (in-app)
The app boots `CircleStackComponent` into the `#app` container.

```ts
// src/main.ts
import './styles/global.css';
import { CircleStackComponent } from './components/CircleStack';

const appContainer = document.getElementById('app') as HTMLDivElement;
if (appContainer) {
  const circleStack = new CircleStackComponent(appContainer, { name: 'Alex' });
  window.addEventListener('beforeunload', () => circleStack.destroy());
}
```

### Passing a name
- Query parameter: append `?name=YourName` to the URL; the name is uppercased.
- Programmatic: pass `{ name: 'YourName' }` when constructing `CircleStackComponent`.
- Default: `ГОСТЬ!` if neither is provided.

### Embedding in another page
Add a container and create the component:

```html
<div id="mount"></div>
<script type="module">
  import { CircleStackComponent } from '/src/components/CircleStack.ts';
  const mount = document.getElementById('mount');
  const comp = new CircleStackComponent(mount, { name: 'Pat' });
  // later: comp.destroy();
}</script>
```

When using a bundler, import via the `@` alias:

```ts
import { CircleStackComponent } from '@/components/CircleStack';
```

### Sizing and responsiveness
`CircleStackComponent` detects its container size and sets the renderer width/height with a small padding. On window resize, it rebuilds the scene after a short debounce.

To control size, set styles on the container element (e.g., via CSS):

```css
#app, #mount {
  width: 100%;
  height: 100vh; /* or any fixed/relative height */
  position: relative;
}
```

### Customizing colors
For per-circle colors, use the low-level `BirthdayBalloons` API with `circleColorFn`:

```ts
import { BirthdayBalloons } from '@/utils/BirthdayBalloons';

const element = document.getElementById('mount')!;
const balloons = new BirthdayBalloons({
  element,
  width: 800,
  height: 600,
  rows: 15,
  cols: 10,
  circleRadius: 18,
  letters: Array.from({ length: 10 }, () => Array(10).fill('*')),
  circleColorFn: (row, col) => `hsl(${(row * 30 + col * 15) % 360}, 70%, 80%)`,
});
```

### Providing custom letters
Construct a 2D `letters` grid where `'*'` means empty. Example for a 10×10 grid:

```ts
const letters = Array.from({ length: 10 }, () => Array(10).fill('*'));
// write text centered on selected rows/cols
"HELLO".split('').forEach((ch, i) => { letters[1][2 + i] = ch; });
```

### Cleanup
Always stop or destroy instances on page unload/navigation:

```ts
const comp = new CircleStackComponent(container);
window.addEventListener('beforeunload', () => comp.destroy());
```

### Troubleshooting
- Ensure the container has non-zero width/height; otherwise the canvas may be tiny.
- If using custom builds, include the Google Fonts links or adjust `renderText` font family.
- Interaction requires the canvas to be focusable/visible; avoid overlaying blockers.

