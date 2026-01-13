import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: any = null;
  @Output() taskAdded = new EventEmitter<any>();
  @Output() taskUpdated = new EventEmitter<any>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      completed: [false] // Campo oculto para mantener el estado al editar
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit);
    }
  }

 onSubmit(formDirective: FormGroupDirective) {
  if (this.taskForm.valid) {
    if (this.taskForm.value.id) {
      this.taskUpdated.emit(this.taskForm.value);
    } else {
      this.taskAdded.emit(this.taskForm.value);
    }
    
    // Llamamos al reset pasando la directiva
    this.resetForm(formDirective);
  }
}

resetForm(formDirective: FormGroupDirective) {
  // 1. Resetea la directiva del formulario (esto bloquea el botón y limpia errores visuales)
  formDirective.resetForm();
  
  // 2. Resetea el objeto del formulario
  this.taskForm.reset();
  
  // 3. Aseguramos que el estado 'completed' sea false por defecto
  this.taskForm.patchValue({ completed: false });
}
}
