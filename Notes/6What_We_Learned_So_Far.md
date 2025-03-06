### Detailed Notes on Key Angular Concepts

#### 1. Creating Components

**Definition:** A component in Angular is a building block for the UI. It consists of three main parts: the template (HTML), the stylesheet (CSS), and the TypeScript class.

**Creating a Component:**
- Use the Angular CLI to generate a component.
  ```bash
  ng generate component component-name
  ```
- This command creates four files:
  - `component-name.component.ts`
  - `component-name.component.html`
  - `component-name.component.css`
  - `component-name.component.spec.ts`

**Example:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Angular-Crash-Course';
}
```

**Template (header.component.html):**
```html
<header>
  <h1>{{ title }}</h1>
</header>
```

**Stylesheet (header.component.css):**
```css
header {
  text-align: center;
}
```

#### 2. Adding Properties

**Definition:** Properties in Angular components are used to store data that can be used within the component.

**Example:**
- In `header.component.ts`, we define a `title` property.
  ```typescript
  export class HeaderComponent {
    title: string = 'Angular-Crash-Course';
  }
  ```

- In `header.component.html`, we bind this property using interpolation.
  ```html
  <h1>{{ title }}</h1>
  ```

#### 3. Adding Events

**Definition:** Events in Angular are actions triggered by the user, such as clicks, mouse movements, or keyboard presses. These events can be handled by defining event handler methods in the component class.

**Example:**
- Define an event handler method in the component class.
  ```typescript
  export class HeaderComponent {
    title: string = 'Angular-Crash-Course';

    toggleAddTask() {
      alert('angular has a very steep learning curve, but I am up for the challenge');
    }
  }
  ```

- Bind the method to an event in the template using Angular event binding.
  ```html
  <button (click)="toggleAddTask()">Toggle Task</button>
  ```

#### 4. Using Directives

**Definition:** Directives in Angular are classes that add additional behavior to elements in your Angular applications. There are three types of directives:
- **Structural Directives:** Change the DOM layout by adding and removing elements (e.g., `*ngIf`, `*ngFor`).
- **Attribute Directives:** Change the appearance or behavior of an element (e.g., `ngStyle`, `ngClass`).

**Examples:**

- **ngIf:** Conditionally include or exclude an element.
  ```html
  <div *ngIf="showTask">Task is visible</div>
  ```

  ```typescript
  export class HeaderComponent {
    showTask: boolean = true;
  }
  ```

- **ngFor:** Repeat a template for each item in a list.
  ```html
  <ul>
    <li *ngFor="let task of tasks">{{ task.text }}</li>
  </ul>
  ```

  ```typescript
  export class HeaderComponent {
    tasks = [
      { text: 'Task 1' },
      { text: 'Task 2' },
      { text: 'Task 3' }
    ];
  }
  ```

- **ngStyle:** Apply dynamic styles to an element.
  ```html
  <button [ngStyle]="{'background-color': color}" class="btn">{{ text }}</button>
  ```

  ```typescript
  export class ButtonComponent {
    @Input() text: string | undefined;
    @Input() color: string | undefined;
  }
  ```

- **@Input Decorator:** Pass data from a parent component to a child component.
  ```typescript
  @Input() task: Task | undefined;
  ```

**Integration Example:**
- **Parent Component (tasks.component.ts):**
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

- **Parent Component Template (tasks.component.html):**
  ```html
  <div *ngFor="let task of tasks">
    <app-tasks-item [task]="task"></app-tasks-item>
  </div>
  ```

- **Child Component (tasks-item.component.ts):**
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

- **Child Component Template (tasks-item.component.html):**
  ```html
  <div class="task">
    <h3>{{ task?.text }}</h3>
    <p>{{ task?.day }}</p>
  </div>
  ```
  