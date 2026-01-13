import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListComponent } from './task-list.component';
import { task } from '../task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    // UN SOLO bloque de configuración con todas las dependencias
    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,       // Al ser Standalone se importa aquí
        HttpClientTestingModule, // Simula el servicio de la API
        NoopAnimationsModule     // Evita errores de Angular Material Animations
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit y carga inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe agregar una tarea nueva al arreglo de datos', () => {
    // Simulamos una tarea que viene del formulario
    const newTask: any = { title: 'Tarea Test', description: 'Descripción de prueba' };
    const initialCount = component.dataSource.data.length;
    
    component.addTaskToList(newTask);
    
    // Verificamos que el conteo aumentó
    expect(component.dataSource.data.length).toBe(initialCount + 1);
    
    // Buscamos la tarea en el array para asegurar que se insertó correctamente
    const insertedTask = component.dataSource.data.find(t => t.title === 'Tarea Test');
    expect(insertedTask).toBeTruthy();
    expect(insertedTask?.description).toBe('Descripción de prueba');
  });

  it('debe eliminar una tarea del arreglo de datos cuando el usuario confirma', () => {
    // 1. Preparamos el escenario con una tarea
    const taskToDelete: task = { id: 99, title: 'Eliminarme', description: 'Test', completed: false };
    component.dataSource.data = [taskToDelete];
    
    // 2. Espiamos el confirm del navegador para que devuelva 'true' automáticamente
    spyOn(window, 'confirm').and.returnValue(true);
    
    // 3. Ejecutamos la acción
    component.deleteTask(99);
    
    // 4. Verificamos que el arreglo esté vacío
    expect(component.dataSource.data.length).toBe(0);
  });
});