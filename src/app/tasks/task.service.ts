import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task } from './task.model'; // Asegúrate de que coincida con tu archivo de modelo

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // JSONPlaceholder usa /todos para representar tareas
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }
   // Cambiamos de /todos a /posts

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva tarea (Simulación de POST)
  addTask(newTask: task): Observable<task> {
    return this.http.post<task>(this.apiUrl, newTask);
  }

  // Eliminar una tarea (Simulación de DELETE)
  // Cambiamos 'Number' por 'number' para seguir las mejores prácticas
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}