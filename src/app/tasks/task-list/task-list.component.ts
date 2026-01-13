import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { task } from '../task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

// Angular Material Imports
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    TaskFormComponent, 
    MatSnackBarModule, 
    MatProgressSpinnerModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  // Se incluye 'completed' para feedback visual y 'actions' para editar/eliminar [cite: 12, 15]
  displayedColumns: string[] = ['id', 'title', 'description', 'completed', 'actions'];
  dataSource = new MatTableDataSource<task>([]);
  selectedTask: task | null = null;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { 
    this.loadTasks(); 
  }

  // Filtrado de tareas según requerimiento de interfaz amigable [cite: 8]
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Llamada a API pública (JSONPlaceholder) [cite: 21, 22]
  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // Mapeamos los datos de la API a nuestra interfaz [cite: 23]
        this.dataSource.data = tasks.slice(0, 15).map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.completed ? 'Tarea finalizada en sistema' : 'Sin descripción detallada',
          completed: t.completed
        }));
        this.isLoading = false;
        // Paginación implementada [cite: 28, 29]
        setTimeout(() => this.dataSource.paginator = this.paginator);
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Error al conectar con la API', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Gestión de eventos: Agregar [cite: 10, 11, 14]
  addTaskToList(newTask: task) {
    const taskToInsert: task = {
      ...newTask,
      id: this.dataSource.data.length > 0 
          ? Math.max(...this.dataSource.data.map(t => t.id || 0)) + 1 
          : 1,
      completed: false
    };

    this.dataSource.data = [...this.dataSource.data, taskToInsert];
    
    // Feedback visual y navegación automática al final de la lista [cite: 29]
    setTimeout(() => this.paginator?.lastPage());
    this.snackBar.open('Tarea agregada exitosamente', 'OK', { duration: 2000 });
  }

  // Gestión de eventos: Editar [cite: 11, 12]
  editTask(task: task) { 
    this.selectedTask = { ...task }; 
  }

  updateTaskInList(updatedTask: task) {
    const data = [...this.dataSource.data];
    const index = data.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      data[index] = updatedTask;
      this.dataSource.data = data;
      this.selectedTask = null;
      this.snackBar.open('Tarea actualizada', 'OK', { duration: 2000 });
    }
  }

  // Gestión de eventos: Eliminar con confirmación [cite: 11, 15, 16]
  deleteTask(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== id);
      this.snackBar.open('Tarea eliminada del listado', 'OK', { duration: 2000 });
    }
  }

  toggleComplete(element: task) {
    element.completed = !element.completed;
    this.dataSource.data = [...this.dataSource.data];
    const msj = element.completed ? 'Tarea completada' : 'Tarea pendiente';
    this.snackBar.open(msj, 'OK', { duration: 1500 });
  }
}
