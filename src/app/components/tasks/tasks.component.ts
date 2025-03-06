import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { NgFor } from '@angular/common';
import { TasksItemComponent } from '../tasks-item/tasks-item.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, TasksItemComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  handleDelete(task: Task) {
    this.taskService.handleDelete(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }
}
