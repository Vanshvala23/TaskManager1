#### ngStyle Directive
- **Purpose:** Used to apply dynamic inline styles to elements.
- **Syntax:** `[ngStyle]="{'property': value}"`
- **Example:**
  ```html
  <button [ngStyle]="{'background-color': color}" class="btn">{{text}}</button>
  ```

#### @Input Decorator
- **Purpose:** Used to define input properties that allow data to be passed from a parent component to a child component.
- **Syntax:** `@Input() propertyName: type;`
- **Example:**
  ```typescript
  @Input() text: string | undefined;
  @Input() color: string | undefined;
  ```

#### @Output Decorator and EventEmitter
- **Purpose:** Used to create custom events that can be emitted to parent components.
- **Syntax:**
  ```typescript
  @Output() eventName = new EventEmitter<type>();
  ```
- **Example:**
  ```typescript
  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
  ```

#### Component Inputs (Similar to React Props)
- **Purpose:** Allow passing data from parent to child components using `@Input` decorators.
- **Example:**
  ```html
  <app-button text="Click me" color="purple" (btnClick)="toggleAddTask()"></app-button>
  ```

#### Interfaces in TypeScript
- **Purpose:** Define the shape of objects and provide type checking.
- **Syntax:**
  ```typescript
  export interface Task {
    id: number;
    text: string;
    day: string;
    reminder: boolean;
    priority: 'low' | 'medium' | 'high';
  }
  ```
- **Example:**
  ```typescript
  export const TASKS: Task[] = [
    {
      id: 1,
      text: "Doc appointment",
      day: "May 5th at 12:30 pm",
      reminder: true,
      priority: "high"
    },
    // More tasks...
  ];
  ```

#### Dynamic Components
- **Purpose:** Create components that can dynamically receive and display data using `@Input` decorators.
- **Example:**
  ```typescript
  import { Component, Input } from '@angular/core';
  import { Task } from '../../Task';

  @Component({
    selector: 'app-tasks-item',
    standalone: true,
    imports: [],
    templateUrl: './tasks-item.component.html',
    styleUrls: ['./tasks-item.component.css']
  })
  export class TasksItemComponent {
    @Input() task: Task | undefined;
  }
  ```

  ```html
  <div class="task">
    <h3>{{ task?.text }}</h3>
    <p>{{ task?.day }}</p>
  </div>
  ```

#### Integrating Dynamic Components
- **Purpose:** Use dynamic components within other components and pass data to them.
- **Example:**
  ```typescript
  import { Component } from '@angular/core';
  import { TASKS } from '../../mock-tasks';
  import { Task } from '../../Task';
  import { NgFor } from '@angular/common';
  import { TasksItemComponent } from '../tasks-item/tasks-item.component';

  @Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [NgFor, TasksItemComponent],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
  })
  export class TasksComponent {
    tasks: Task[] = TASKS;
  }
  ```

  ```html
  <div *ngFor="let task of tasks">
    <app-tasks-item [task]="task"></app-tasks-item>
  </div>
  ```
