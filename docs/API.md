## API Reference

### CircleStackComponent

Creates and manages the interactive circle stack animation in a provided container.

```ts
new CircleStackComponent(container: HTMLDivElement, props?: { name?: string })
```

- **constructor**(container, props?)
  - **container**: The HTML container where the canvas and animation will be mounted.
  - **props.name**: Optional display name to render in the letter grid. If omitted, the component reads `?name=` from the URL. Defaults to `"ГОСТЬ!"`.

- **destroy()**: Cleans up event listeners and stops the underlying animation engine.

Behavior and lifecycle:
- Initializes immediately on construction.
- Rebuilds the scene after a debounced window resize.
- Applies CSS modules classes from `CircleStack.module.css` to its internal elements.

Usage example:
```ts
import { CircleStackComponent } from '@/components/CircleStack';

const container = document.getElementById('app') as HTMLDivElement;
const circleStack = new CircleStackComponent(container, { name: 'Alex' });

// Later, when disposing
circleStack.destroy();
```

Public props and defaults:
- `name?: string` — optional, uppercased when rendered; defaults to value from URL `?name`, or `ГОСТЬ!`.

---

### BirthdayBalloons

Low-level physics-backed renderer that powers the circle stack animation using `matter-js`.

```ts
new BirthdayBalloons(options: BirthdayBalloonOptions)
```

#### Interfaces

```ts
interface BirthdayBalloonOptions {
  element: HTMLElement;
  width: number;
  height: number;
  rows: number;
  cols: number;
  circleRadius: number;
  letters: string[][];
  circleColorFn?: (row: number, col: number) => string;
}
```

Option details:
- **element**: DOM element used by the `matter-js` renderer to attach the canvas.
- **width/height**: Canvas dimensions in pixels.
- **rows/cols**: Logical grid size for circles.
- **circleRadius**: Radius in pixels for each circle.
- **letters**: 2D matrix of characters. Use `'*'` for empty bubbles.
- **circleColorFn**: Optional callback to customize each circle color.

Instance methods:
- **stop()**: Stops the render loop and physics runner.

Rendering details:
- Adds 4 static boundary walls.
- Evenly distributes circles across the available area with pastel fill colors by default.
- Renders characters in non-`'*'` circles after each frame (`afterRender`) using the canvas 2D context.
- Enables mouse interaction via `Matter.MouseConstraint`.

Usage example:
```ts
import { BirthdayBalloons } from '@/utils/BirthdayBalloons';

const container = document.getElementById('mount')!;
const balloons = new BirthdayBalloons({
  element: container,
  width: 800,
  height: 600,
  rows: 15,
  cols: 10,
  circleRadius: 18,
  letters: Array.from({ length: 10 }, () => Array(10).fill('*')),
  circleColorFn: (r, c) => (r + c) % 2 === 0 ? '#ffd1dc' : '#d1ffd6',
});

// later
balloons.stop();
```

---

### Vite Configuration

`vite.config.ts` exports the default config that sets up a path alias `@` → `./src`.

```ts
export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, './src') } },
});
```

