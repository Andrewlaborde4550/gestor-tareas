import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        NoopAnimationsModule // Agrega esto para desactivar animaciones en el test
      ]
    });
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
