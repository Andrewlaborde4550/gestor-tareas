import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Importante para el Lazy Loading
import { MatToolbarModule } from '@angular/material/toolbar'; // Importante para el error del mat-toolbar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestor-tareas';
}
