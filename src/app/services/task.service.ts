import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[];

  constructor() {
    this.tasks = this.loadTasks();
  }

  private loadTasks(): Task[] {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
      this.saveTasks();
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  exportTasksToCSV(): void {
    const tasks = this.getTasks();
    const csvData = tasks.map(task => ({
      Title: task.title,
      Description: task.description,
      'Due Date': task.dueDate,
      Priority: task.priority,
      Status: task.status,
      History: task.history.join(' | ')
    }));

    const csvContent = [
      ['Title', 'Description', 'Due Date', 'Priority', 'Status', 'History'],
      ...csvData.map(task => [
        task.Title,
        task.Description,
        task['Due Date'],
        task.Priority,
        task.Status,
        task.History
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
