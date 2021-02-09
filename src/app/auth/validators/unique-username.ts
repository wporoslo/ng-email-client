import { Injectable } from '@angular/core';
import { FormControl, AsyncValidator } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (formControl: FormControl) => {
    const { value } = formControl;

    return this.authService.usernameAvailable(value).pipe(
      // in this case effectively the same as
      // map(() => null), because we only ever get to this poin
      // if the user is available
      // in other case we get an error and we no value
      // gets thrown into the map operator
      map((value) => {
        if (value.available) {
          return null;
        }
      }),
      catchError((err) => {
        console.log(err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
