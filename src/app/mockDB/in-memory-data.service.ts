import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../tasks/shared/task.model';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        title: 'test task 1',
        description: 'This is a test description',
        createdAt: new Date(),
        createdBy: 'Test User',
      },
      {
        id: 2,
        title: 'test task 2',
        description: 'This is a test description',
        createdAt: new Date(),
        createdBy: 'Test User',
      },
      {
        id: 3,
        title: 'test task 3',
        description: 'This is a test description',
        createdAt: new Date(),
        createdBy: 'Test User',
      },
      {
        id: 4,
        title: 'test task 4',
        description: 'This is a test description',
        createdAt: new Date(),
        createdBy: 'Test User',
      },
    ];
    return { tasks };
  }
}
