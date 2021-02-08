import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, AsyncValidator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(formControl: FormControl) {}
}
