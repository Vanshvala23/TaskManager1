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

  @Output() btnClick = new EventEmitter<void>(); // Event emitter for button click

  onClick() {
    this.btnClick.emit(); // Emit the event when the button is clicked
  }
}
