import { Component, OnInit } from '@angular/core';
import { TaskService } from './shared/task.service';
import { Task } from '../tasks/shared/task.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  displayedColumns = [
    'id',
    'createdAt',
    'deletedAt',
    'title',
    'description',
    'createdBy',
    'requiredDate',
    'completed',
  ];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  add(title: string, description: string): void {
    title = title.trim();
    if (!description || !title) {
      return;
    }
  }
  delete(task: Task): void {
    this.tasks = this.tasks.filter((foundTask) => foundTask !== task);
    this.taskService.deleteTask(task).subscribe();
  }
}
