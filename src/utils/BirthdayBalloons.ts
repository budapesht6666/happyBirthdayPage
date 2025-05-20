import Matter from 'matter-js';

export interface BirthdayBalloonOptions {
  element: HTMLElement;
  width: number;
  height: number;
  rows: number;
  cols: number;
  circleRadius: number;
  letters: string[][];
  circleColorFn?: (row: number, col: number) => string;
}

export class BirthdayBalloons {
  private engine: Matter.Engine;
  private render: Matter.Render;
  private runner: Matter.Runner;
  private mouse: Matter.Mouse;
  private mouseConstraint: Matter.MouseConstraint;
  private stack: Matter.Composite;
  private world: Matter.World;
  private options: BirthdayBalloonOptions;
  private circleData: { body: Matter.Body; letter: string }[] = [];

  constructor(options: BirthdayBalloonOptions) {
    this.options = options;
    
    // create engine
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;

    // create renderer
    this.render = Matter.Render.create({
      element: options.element,
      engine: this.engine,
      options: {
        width: options.width,
        height: options.height,
        wireframes: false,
        background: '#111111'
      }
    });

    Matter.Render.run(this.render);

    // create runner
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    // Создаем шарики с буквами
    this.stack = this.createCircleStack();
    
    // add bodies
    Matter.Composite.add(this.world, [
      // walls
      Matter.Bodies.rectangle(options.width / 2, 0, options.width, 50, { isStatic: true }),
      Matter.Bodies.rectangle(options.width / 2, options.height, options.width, 50, { isStatic: true }),
      Matter.Bodies.rectangle(options.width, options.height / 2, 50, options.height, { isStatic: true }),
      Matter.Bodies.rectangle(0, options.height / 2, 50, options.height, { isStatic: true }),
      this.stack
    ]);

    // add mouse control
    this.mouse = Matter.Mouse.create(this.render.canvas);
    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Matter.Composite.add(this.world, this.mouseConstraint);

    // keep the mouse in sync with rendering
    this.render.mouse = this.mouse;
    
    // fit the render viewport to the scene
    Matter.Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: options.width, y: options.height }
    });

    // Добавляем обработчик для отрисовки текста в шариках
    Matter.Events.on(this.render, 'afterRender', () => {
      this.renderText();
    });
  }

  private createCircleStack(): Matter.Composite {
    const { cols, rows, circleRadius } = this.options;
    
    // Вычисляем, сколько шариков поместится по горизонтали и вертикали
    const availableWidth = this.options.width - 100; // Отступы с краев
    const availableHeight = this.options.height - 100;
    
    // Определяем расстояние между шариками для равномерного распределения
    const horizontalGap = availableWidth / cols;
    const verticalGap = availableHeight / rows;
    
    // Начальные координаты для центрирования сетки
    const startX = 50 + (horizontalGap - circleRadius * 2) / 2;
    const startY = 50 + (verticalGap - circleRadius * 2) / 2;
    
    // Создаем равномерно распределенную сетку шариков
    const stack = Matter.Composites.stack(
      startX, startY, cols, rows, horizontalGap - circleRadius * 2, verticalGap - circleRadius * 2, 
      (x: number, y: number, indexCol: number, indexRow: number) => {
        // Generate a pastel color for the circle
        const color = this.options.circleColorFn 
          ? this.options.circleColorFn(indexRow, indexCol) 
          : this.generatePastelColor();

        // Create the circle with a colored render option
        const circle = Matter.Bodies.circle(x, y, circleRadius, {
          restitution: 0.1,
          friction: 0.1,
          render: {
            fillStyle: color,
            strokeStyle: '#333',
            lineWidth: 1
          }
        });

        // Получаем букву для данной позиции
        const letter = this.options.letters[indexRow]?.[indexCol] || '*';

        // Сохраняем тело и его букву
        this.circleData.push({ body: circle, letter });

        return circle;
      }
    );

    return stack;
  }

  private renderText(): void {
    const ctx = this.render.context as CanvasRenderingContext2D;
    if (!ctx) return;

    ctx.font = `bold ${Math.max(14, this.options.circleRadius * 0.8)}px 'Dancing Script', 'Roboto', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';

    this.circleData.forEach(item => {
      // Не отображаем звездочки (пустые шарики)
      if (item.letter !== '*') {
        const pos = item.body.position;
        ctx.fillText(item.letter, pos.x, pos.y);
      }
    });
  }

  private generatePastelColor(): string {
    // Generate a pastel color
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(50 + Math.random() * 30); // 50-80%
    const lightness = Math.floor(70 + Math.random() * 20); // 70-90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  public stop(): void {
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
  }
} 