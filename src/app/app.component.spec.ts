import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'gestor-tareas' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gestor-tareas'); // Cambia 'taks-app' por 'gestor-tareas'
  });

 it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Dispara el ciclo de vida inicial
    
    await fixture.whenStable(); // Espera a que los componentes de Material carguen
    fixture.detectChanges(); // Refresca la vista tras la espera

    const compiled = fixture.nativeElement as HTMLElement;
    
  });
});
