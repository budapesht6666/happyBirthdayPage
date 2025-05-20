import './styles/global.css';
import { CircleStackComponent } from './components/CircleStack';

// Get the container element
const appContainer = document.getElementById('app') as HTMLDivElement;

if (appContainer) {
  // Add app container styles
  appContainer.style.position = 'relative';
  
  // Initialize the CircleStack component
  const circleStack = new CircleStackComponent(appContainer);
  
  // Clean up on window unload111
  window.addEventListener('beforeunload', () => {
    circleStack.destroy();
  });
} 