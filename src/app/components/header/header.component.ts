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
