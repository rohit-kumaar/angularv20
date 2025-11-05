import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

class NewUser {
  id?: any;
  name: string;
  email: string;
  password: string;

  constructor() {
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
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  API = 'http://localhost:3000/users';
  http = inject(HttpClient);
  users$!: Observable<NewUser[]>;
  isUpdate: boolean = false;
  currentId?: any;

  constructor() {
    const user = new NewUser();

    this.userFormGrp = new FormGroup({
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

    this.loadUserFn();
  }

  createUserFn() {
    if (this.userFormGrp.valid) {
      // debugger;
      const userFormGrpVal = this.userFormGrp.value;
      // debugger;
      this.http.post(this.API, userFormGrpVal).subscribe({
        next: () => this.loadUserFn(),
        error: (e) => console.error(e),
        complete: () => {
          this.userFormGrp.reset();
          console.log('User Added Successfully');
        },
      });
    }
  }

  loadUserFn() {
    this.users$ = this.http.get<NewUser[]>(this.API);
  }

  editFn(user: NewUser) {
    this.userFormGrp.patchValue(user);
    this.isUpdate = true;
    this.currentId = user.id;
  }

  updateFn() {
    const userFormGrpVal = this.userFormGrp.value;
    const url = `${this.API}/${this.currentId}`;

    this.http.put(url, userFormGrpVal).subscribe({
      next: () => this.loadUserFn(),
      error: (e) => console.error(e),
      complete: () => {
        this.userFormGrp.reset(new NewUser());
        this.isUpdate = false;
        console.warn('User updated successfully!');
      },
    });
  }

  deleteFn(id: number) {
    const url = `${this.API}/${id}`;
    console.log(url);

    const isDelete = confirm('Are you sure you want to delete?');

    if (isDelete) {
      this.http.delete(url).subscribe({
        next: () => this.loadUserFn(),
        error: (e) => console.error(e),
        complete: () => console.warn('User is deleted'),
      });
    }
  }
}
