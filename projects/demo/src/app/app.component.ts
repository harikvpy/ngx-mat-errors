import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NgxErrorList,
  NgxMatErrorDef,
  NgxMatErrors,
  NgxMatErrorsForDateRangePicker,
} from 'ngx-mat-errors';
import { delay, of } from 'rxjs';
import { AsyncMinLengthValidator } from './async-min-length-validator.directive';

@Component({
  selector: 'body',
  // templateUrl: './app.component.html',
  template: `
    <div class="wrapper">
      <div class="">
        @if (form.errors) {
          <div class="error-box">
            <div [ngx-error-list]="form"></div>
          </div>
        }
        <form (ngSubmit)="onSubmit()" [formGroup]="form">

          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name">
            <mat-error ngx-mat-errors></mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Age</mat-label>
            <input type="number" matInput formControlName="age">
            <mat-error ngx-mat-errors></mat-error>
          </mat-form-field>
          <div>
            <button mat-raised-button color="secondary" type="reset">Reset</button>&nbsp;
            <button mat-raised-button color="primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatErrors,
    NgxErrorList,
    NgxMatErrorDef,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncMinLengthValidator,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    NgxMatErrorsForDateRangePicker,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  readonly control1 = new FormControl<string>('', [
    Validators.required,
    Validators.pattern('[0-9]{0,2}'),
  ]);
  readonly control2 = new FormControl<number | null>(null, [
    Validators.min(10),
    Validators.max(20),
  ]);
  readonly control3 = new FormControl<string>('', {
    asyncValidators: [
      (control) => of(Validators.minLength(3)(control)).pipe(delay(250)),
    ],
  });
  readonly time = new FormControl<Date | null>(new Date('2024-11-22 12:30'));

  readonly dateRange = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  readonly minDate = new Date();

  value1: string | null = null;
  value2: number | null = null;
  value3: string | null = null;
  value4: Date | null = null;
  value5: Date | null = null;
  value6: Date | null = null;

  readonly outerErrorControl = new FormControl<string | null>(null);
  getControl(
    control1: AbstractControl | AbstractControlDirective,
    control2: AbstractControl | AbstractControlDirective
  ) {
    switch (this.outerErrorControl.value) {
      case '1':
        return control1;
      case '2':
        return control2;
      default:
        return undefined;
    }
  }

  form = new FormGroup({
    name: new FormControl(undefined, { validators: [Validators.required, Validators.minLength(6)] }),
    age: new FormControl(undefined, { validators: [Validators.minLength(2)] })
  });

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    const name = this.form.get('name');
    name?.touched
  }

  onSubmit() {
    const value = this.form.value;
    if (!value?.age || value.age < 40) {
      this.form.setErrors({
        dateNotWithinCurrentFiscalPeriod: true,
        minlength: true,
        required: true
      });
      const name = this.form.get('name') as FormControl;
      if (name) {
        name.setErrors({ minlength: true });
      }
      const age = this.form.get('age');
      if (age && age.value && age.value < 20) {
        age.setErrors({
          minlength: 2,
          required: true,
          dateNotWithinCurrentFiscalPeriod: true
        });
      }
    } else {
      this.form.setErrors(null);
    }
    this.cdr.detectChanges();
  }
}
