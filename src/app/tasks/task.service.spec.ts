import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Simula peticiones HTTP sin hacerlas reales
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debe obtener la lista de tareas desde la API (GET)', () => {
    const dummyTasks = [
      { id: 1, title: 'Test Task', completed: false }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks); // Simula la respuesta de la API
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya peticiones pendientes
  });
  // Prueba para Agregar
  it('debe enviar una petición POST para agregar una tarea', () => {
    const newTask = { title: 'Nueva Tarea', description: 'Prueba unitaria', completed: false };

    service.addTask(newTask).subscribe();

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
  });

  // Prueba para Eliminar
  it('debe enviar una petición DELETE para eliminar una tarea', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe();

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    expect(req.request.method).toBe('DELETE');
  });
});