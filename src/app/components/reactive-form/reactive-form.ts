import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

class NewUser {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {
  userFormGrp: FormGroup<{
    id: FormControl<number>;
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  API = 'http://localhost:3000/users';
  http = inject(HttpClient);
  users$: Observable<NewUser[]>;

  constructor() {
    const user = new NewUser();

    this.userFormGrp = new FormGroup({
      id: new FormControl(user.id, { nonNullable: true }),
      name: new FormControl(user.name, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      email: new FormControl(user.email, {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(user.password, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });

    this.users$ = this.http.get<NewUser[]>(this.API);
  }

  createUserFn() {
    if (this.userFormGrp.valid) {
      // debugger;
      const userFormGrpVal = this.userFormGrp.value;
      // debugger;
      this.http.post(this.API, userFormGrpVal).subscribe({
        next: () => alert('User Is Registered'),
        error: (e) => console.error(e),
        complete: () => {
          this.users$ = this.http.get<NewUser[]>(this.API);
          console.log(userFormGrpVal);
          console.log('Complete');
          this.userFormGrp.reset();
        },
      });
    }
  }

  editFn(user: NewUser) {
    this.userFormGrp = new FormGroup({
      id: new FormControl(user.id, { nonNullable: true }),
      name: new FormControl(user.name, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      email: new FormControl(user.email, {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(user.password, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  updateFn() {
    const userFormGrpVal = this.userFormGrp.value;
    const url = `${this.API}/${userFormGrpVal.id}`;
    console.log(url);

    this.http.put(url, userFormGrpVal).subscribe({
      next: () => alert('User updated successfully!'),
      error: (e) => console.error(e),
      complete: () => {
        this.users$ = this.http.get<NewUser[]>(this.API);
        this.userFormGrp = new FormGroup({
          id: new FormControl(0, { nonNullable: true }),
          name: new FormControl('', { nonNullable: true }),
          email: new FormControl('', { nonNullable: true }),
          password: new FormControl('', { nonNullable: true }),
        });
        console.log('User Updated');
      },
    });
  }

  deleteFn(id: number) {
    const url = `${this.API}/${id}`;
    const isDelete = confirm('Are you sure you want to delete?');

    if (isDelete) {
      this.http.delete(url).subscribe({
        next: () => alert('User is deleted'),
        error: (e) => console.error(e),
        complete: () => {
          this.users$ = this.http.get<NewUser[]>(this.API);
          console.warn('User is deleted');
        },
      });
    }
  }
}
