import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    // Aquí implementamos Lazy Loading cargando el componente solo cuando se solicita
    loadComponent: () => import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
