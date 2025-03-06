### Angular Notes

#### ngStyle
- **Purpose:** `ngStyle` is an Angular directive used to dynamically set inline styles for an HTML element.
- **Syntax:** 
  ```html
  <div [ngStyle]="{'property': value}"></div>
  ```
  - Example: 
    ```html
    <button [ngStyle]="{'background-color': color}">Click Me</button>
    ```
  - Here, `color` is a property in the component class that determines the button's background color.
  
#### @Input
- **Purpose:** The `@Input` decorator is used to define input properties in an Angular component. These properties can receive data from a parent component.
- **Syntax:**
  ```typescript
  @Input() propertyName: dataType;
  ```
  - Example:
    ```typescript
    @Input() text: string | undefined;
    ```
  - This allows the `text` property to receive a value from a parent component.

- **Usage:** 
  ```html
  <app-child [text]="'Hello World'"></app-child>
  ```
  - Here, the `text` property of the `app-child` component is set to `'Hello World'`.

#### @Output and EventEmitter
- **Purpose:** The `@Output` decorator and `EventEmitter` class are used to create custom events that a component can emit to its parent component.
- **Syntax:**
  ```typescript
  @Output() eventName = new EventEmitter<dataType>();
  ```
  - Example:
    ```typescript
    @Output() btnClick = new EventEmitter<void>();
    ```
  - This sets up an event `btnClick` that can be emitted to notify the parent component.

- **Usage:**
  ```typescript
  this.btnClick.emit();
  ```
  - This line in a method will emit the `btnClick` event.

- **Handling the Event in Parent Component:**
  ```html
  <app-child (btnClick)="handleClick()"></app-child>
  ```
  - Here, `handleClick` is a method in the parent component that responds to the `btnClick` event.

#### Component Input (Similar to React Props)
- **Purpose:** Component inputs in Angular allow passing data from a parent component to a child component, similar to how props work in React.
- **Angular Example:**
  ```typescript
  @Input() text: string | undefined;
  ```
  - This property in the child component can receive a value from the parent component.

- **React Props Example:**
  ```jsx
  function ChildComponent(props) {
    return <div>{props.text}</div>;
  }
  ```
  - Here, `props.text` in the React component works similarly to `@Input() text` in Angular.

### Examples of Learned Concepts

#### Full Example with `ngStyle`, `@Input`, `@Output`, and EventEmitter

1. **Button Component:**

   ```typescript
   import { Component, Input, Output, EventEmitter } from '@angular/core';
   import { NgStyle } from '@angular/common';

   @Component({
     selector: 'app-button',
     standalone: true,
     imports: [NgStyle],
     templateUrl: './button.component.html',
     styleUrls: ['./button.component.css']
   })
   export class ButtonComponent {
     @Input() text: string | undefined;
     @Input() color: string | undefined;

     @Output() btnClick = new EventEmitter<void>();

     onClick() {
       this.btnClick.emit();
     }
   }
   ```

   **Button Component Template (`button.component.html`):**

   ```html
   <button [ngStyle]="{'background-color': color}" class="btn" (click)="onClick()">
     {{text}}
   </button>
   ```

2. **Header Component:**

   ```typescript
   import { Component } from '@angular/core';
   import { ButtonComponent } from '../button/button.component';

   @Component({
     selector: 'app-header',
     standalone: true,
     imports: [ButtonComponent],
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.css']
   })
   export class HeaderComponent {
     title: string = 'Angular-Crash-Course';

     toggleAddTask() {
       alert("Angular has a very steep learning curve, but I am up for the challenge");
     }
   }
   ```

   **Header Component Template (`header.component.html`):**

   ```html
   <header>
     <p>{{title}}</p>
     <app-button text="Click me if you want" color="purple" (btnClick)="toggleAddTask()"></app-button>
   </header>
   ```

### Summary

- **ngStyle:** Used to dynamically set inline styles for HTML elements.
- **@Input:** Used to define input properties that receive data from a parent component, similar to React props.
- **@Output and EventEmitter:** Used to create custom events that a component can emit to its parent component.
- **Component Input:** Angular inputs function similarly to React props, allowing data to be passed from parent to child components.

These concepts provide a foundation for creating dynamic, interactive components in Angular applications, leveraging the power of data binding and event handling.