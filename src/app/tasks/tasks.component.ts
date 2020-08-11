import { Component, OnInit } from "@angular/core";
import { TaskService } from "./shared/task.service";
import { Task } from "../tasks/shared/task.model";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  inputTaskForm;
  tasks: Task[];
  displayedColumns = [
    "id",
    "createdAt",
    "title",
    "description",
    "createdBy",
    "requiredDate",
    "completed",
  ];
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.inputTaskForm = this.formBuilder.group({
      title: "",
      description: "",
      completed: true,
      requiredDate: new Date().toISOString(),
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  add(task: Task): void {
    task.title = task.title;
    task.createdBy = "Jason Scherer";
    if (!task.description || !task.title) {
      return;
    }
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
    });
  }
  delete(task: Task): void {
    this.tasks = this.tasks.filter((foundTask) => foundTask !== task);
    this.taskService.deleteTask(task).subscribe();
  }
}
