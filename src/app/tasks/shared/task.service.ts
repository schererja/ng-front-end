import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Task, CreateTask } from './task.model';
import { TASKS } from './mock-tasks';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'http://172.24.209.112:8080/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    console.log('Tasks found');

    const tasks = this.http.get<Task[]>(this.tasksUrl).pipe(
      tap((data) => {
        console.log('Fetched Tasks');
        console.log(data);
      }),
      catchError(this.handleError<Task[]>('getTasks', []))
    );

    return tasks;
  }
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap((_) => console.log(`Found user: ${id}`)),
      catchError(this.handleError<Task>(`Got Task id=${id}`))
    );
  }
  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap((_) => console.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => console.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }
  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  /* GET taskes whose name contains search term */
  searchTaskes(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty task array.
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? console.log(`found taskes matching "${term}"`)
          : console.log(`no taskes matching "${term}"`)
      ),
      catchError(this.handleError<Task[]>('searchTaskes', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
