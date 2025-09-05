# Happy Birthday CircleStack

**ALWAYS follow these instructions first. Only fallback to search or bash commands when you encounter unexpected information that does not match the info here.**

Happy Birthday CircleStack is an interactive web application built with Vite.js, TypeScript, and Matter.js physics engine. It displays an animated stack of colorful balloons containing birthday message letters that users can interact with via mouse or touch.

## Working Effectively

### Bootstrap and Build the Repository
- Install dependencies: `npm install` -- takes 3 seconds, completes successfully
- Build the application: `npm run build` -- takes 2.5 seconds, NEVER CANCEL
- Type check and compilation: Uses TypeScript with strict settings, build includes `tsc && vite build`

### Run the Application
- Development server: `npm run dev` -- starts in 200ms on http://localhost:5173/
- Preview built application: `npm run preview` -- serves built app on http://localhost:4173/
- Both servers support hot reloading and are ready almost instantly

### Validation
- **CRITICAL**: Always manually test the application after making changes
- **Default behavior test**: Navigate to http://localhost:5173/ -- should show "HAPPY BIRTHDAY ГОСТЬ!" (Guest in Russian)
- **Custom name test**: Navigate to http://localhost:5173/?name=TestName -- should show "HAPPY BIRTHDAY TESTNAME!"
- **Physics interaction test**: Verify balloons can be dragged and moved with mouse/touch
- **Mobile responsiveness test**: Verify application works on different screen sizes
- Build and serve the production version to ensure no runtime errors

### No Testing or Linting Framework
- **Important**: This project currently has NO unit tests, integration tests, or linting tools
- Do not attempt to run `npm test`, `npm run lint`, or similar commands -- they do not exist
- When making changes, rely on manual testing and TypeScript compilation for validation
- Maintain existing code patterns and TypeScript strict mode compliance

## Project Structure and Key Components

### Entry Points and Main Files
- `/src/main.ts` -- Application entry point, initializes CircleStackComponent
- `/src/components/CircleStack.ts` -- Main component managing the balloon display
- `/src/utils/BirthdayBalloons.ts` -- Matter.js physics engine implementation
- `/index.html` -- HTML template with Google Fonts integration

### Styling
- `/src/styles/global.css` -- Global styles, dark theme (#111111 background)
- `/src/styles/CircleStack.module.css` -- Component-specific CSS modules
- Uses 'Dancing Script' font from Google Fonts with 'Roboto' fallback

### Configuration Files
- `vite.config.ts` -- Vite build configuration with path aliases
- `tsconfig.json` -- TypeScript configuration with strict mode enabled
- `package.json` -- Only contains dev, build, and preview scripts

### Build Output
- `/dist/` -- Generated build output (excluded from git via .gitignore)
- Production build creates optimized bundles with CSS and JS assets

## Language and Internationalization
- Default guest name is "ГОСТЬ!" (Russian for "Guest!")
- Application supports custom names via URL query parameter: `?name=YourName`
- Names are automatically converted to uppercase in the display
- Text rendering uses Dancing Script font for visual appeal

## Matter.js Physics Implementation
- Creates interactive physics simulation with balloons as circular bodies
- Supports mouse/touch constraints for dragging balloons
- Renders at 60fps with collision detection and gravity
- Balloons contain letters that spell out the birthday message
- Physics world is contained within the viewport boundaries

## Common Development Tasks

### Making Code Changes
1. Always run `npm run dev` to start development server
2. Make your changes to TypeScript files in `/src/`
3. Test both default behavior (no name parameter) and custom name functionality
4. Verify physics interactions work correctly
5. Run `npm run build` to ensure production build succeeds
6. Test the production build with `npm run preview`

### Adding New Features
- Follow existing TypeScript patterns and maintain strict mode compliance
- New components should follow the module pattern established in `/src/components/`
- Utility functions go in `/src/utils/` directory
- Use CSS modules for component-specific styling
- Ensure mobile responsiveness and touch interaction support

### CSS and Styling Changes
- Global styles go in `/src/styles/global.css`
- Component styles use CSS modules (*.module.css files)
- Maintain the dark theme (#111111 background) established in the design
- Test on different screen sizes to ensure responsiveness

### Troubleshooting
- If build fails, check TypeScript errors first -- all code must pass strict type checking
- If physics doesn't work, verify Matter.js engine initialization in BirthdayBalloons.ts
- If fonts don't load, check Google Fonts connection in index.html
- For performance issues, check Matter.js render loop and constraint configurations

## Directory Structure Reference
```
/
├── .github/           # GitHub configuration (create if needed)
├── public/            # Static assets (favicon.svg)
├── src/
│   ├── components/    # React-style TypeScript components
│   ├── styles/        # CSS and CSS modules
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions and classes
│   └── main.ts        # Application entry point
├── dist/              # Build output (git ignored)
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite build configuration
```