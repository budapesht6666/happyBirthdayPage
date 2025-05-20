import { BirthdayBalloons } from '../utils/BirthdayBalloons';
import styles from '../styles/CircleStack.module.css';

interface CircleStackProps {
  name?: string;
}

export class CircleStackComponent {
  private container: HTMLDivElement;
  private birthdayBalloons: BirthdayBalloons | null = null;
  private props: CircleStackProps;

  constructor(container: HTMLDivElement, props: CircleStackProps = {}) {
    this.container = container;
    this.props = props;
    this.setupCircleStack();
    this.addResizeListener();
  }

  private setupCircleStack(): void {
    // Clear previous content
    this.container.innerHTML = '';
    
    // Create container for the canvas
    const canvasContainer = document.createElement('div');
    canvasContainer.className = styles.container;
    this.container.appendChild(canvasContainer);

    // Get display name from URL or use default "ГОСТЬ!"
    const displayName = this.getDisplayName();
    
    // Prepare the letters grid (10x10)
    const letters = this.generateLettersGrid(displayName);
    
    // Используем размеры контейнера вместо фиксированных значений
    // Вычисляем размеры на основе доступного пространства
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    
    // Устанавливаем размеры канваса с некоторым отступом
    const width = containerWidth - 20;
    const height = containerHeight - 20;
    
    // Определяем оптимальный радиус шарика на основе размеров контейнера
    // и количества шариков в сетке (10x10)
    const circleRadius = Math.min(width / 22, height / 22);
    
    // Clean up any previous instance
    if (this.birthdayBalloons) {
      this.birthdayBalloons.stop();
      this.birthdayBalloons = null;
    }

    // Create new circle stack
    this.birthdayBalloons = new BirthdayBalloons({
      element: canvasContainer,
      width,
      height,
      rows: 15,
      cols: 10,
      circleRadius,
      letters
    });

    // Add css module class to the canvas
    const canvas = canvasContainer.querySelector('canvas');
    if (canvas) {
      canvas.className = styles.canvas;
    }
  }

  private generateLettersGrid(name: string): string[][] {
    // Create a 10x10 grid filled with "*" (represents circles without letters)
    const grid: string[][] = Array(10).fill(0).map(() => Array(10).fill('*'));
    
    // Define the Happy Birthday text pattern
    // Row 1: **********
    // Row 2: **HAPPY***
    // Row 3: **********
    // Row 4: *BIRTHDAY*
    // Row 5: **********
    // Row 6: **{name}***
    // Row 7-10: **********
    
    // Add "HAPPY" to row 2 (centered)
    const happy = "HAPPY";
    const happyStart = Math.floor((10 - happy.length) / 2);
    for (let i = 0; i < happy.length; i++) {
      grid[1][happyStart + i] = happy[i];
    }
    
    // Add "BIRTHDAY" to row 4 (centered)
    const birthday = "BIRTHDAY";
    const birthdayStart = Math.floor((10 - birthday.length) / 2);
    for (let i = 0; i < birthday.length; i++) {
      grid[3][birthdayStart + i] = birthday[i];
    }
    
    // Add the name to row 6 (centered)
    // Truncate the name if it's longer than 8 characters (to fit in the 10x10 grid with ** on each side)
    const truncatedName = name.substring(0, 10);
    const nameStart = Math.floor((10 - truncatedName.length) / 2);
    for (let i = 0; i < truncatedName.length; i++) {
      grid[5][nameStart + i] = truncatedName[i];
    }
    
    return grid;
  }

  private getDisplayName(): string {
    // Use props.name if provided
    if (this.props.name) {
      return this.props.name.toUpperCase();
    }
    
    // Otherwise, get name from URL query parameter or use default
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    
    return nameParam ? nameParam.toUpperCase() : 'ГОСТЬ!';
  }

  private addResizeListener(): void {
    // Add resize event listener to rebuild the circle stack when window size changes
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    // Debounce the resize event
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.setupCircleStack();
    }, 250);
  }

  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  public destroy(): void {
    // Clean up event listeners and the circle stack
    window.removeEventListener('resize', this.handleResize.bind(this));
    
    if (this.birthdayBalloons) {
      this.birthdayBalloons.stop();
      this.birthdayBalloons = null;
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
} 