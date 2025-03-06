import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit?: Task;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['', Validators.required],  // Make priority required without default value
      status: ['to-do'],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit);
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Please fill in the required fields: Title and Priority.');
      return;
    }
    const formValue = this.taskForm.value;
    const now = new Date().toLocaleString();
    if (this.taskToEdit) {
      const updatedTask: Task = {
        ...this.taskToEdit,
        ...formValue,
        history: [
          ...this.taskToEdit.history,
          `Task "${this.taskToEdit.title}" updated on ${now}: ${this.generateUpdateLog(this.taskToEdit, formValue)}`
        ],
      };
      this.taskService.updateTask(updatedTask);
      this.taskToEdit = undefined;
    } else {
      const newTask: Task = {
        ...formValue,
        id: Date.now(),
        history: [`Task "${formValue.title}" created on ${now}`],
      };
      this.taskService.addTask(newTask);
    }
    this.taskForm.reset();
  }

  private generateUpdateLog(oldTask: Task, newTask: any): string {
    let log = '';
    if (oldTask.title !== newTask.title) log += `Title changed from "${oldTask.title}" to "${newTask.title}". `;
    if (oldTask.description !== newTask.description) log += `Description changed. `;
    if (oldTask.dueDate !== newTask.dueDate) log += `Due date changed from ${oldTask.dueDate} to ${newTask.dueDate}. `;
    if (oldTask.priority !== newTask.priority) log += `Priority changed from ${oldTask.priority} to ${newTask.priority}. `;
    if (oldTask.status !== newTask.status) log += `Status changed from ${oldTask.status} to ${newTask.status}. `;
    return log.trim();
  }
}
