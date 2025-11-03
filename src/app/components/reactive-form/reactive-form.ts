import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {
  API = 'https://jsonplaceholder.typicode.com/posts';

  formGroupForUser: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    body: new FormControl(''),
  });

  http = inject(HttpClient);
  posts$: Observable<any[]>;

  constructor() {
    this.posts$ = this.http.get<any[]>(this.API);
  }

  handleSubmitFn() {
    // debugger;
    const userFormValue = this.formGroupForUser.value;

    this.http.post(this.API, userFormValue).subscribe({
      next: () => alert('User Is Registered'),
      error: (e) => console.error(e),
      complete: () => console.log('Complete'),
    });
  }

  editFn(post: any) {
    this.formGroupForUser = new FormGroup({
      id: new FormControl(post.id),
      title: new FormControl(post.title),
      body: new FormControl(post.body),
    });
  }

  updateFn() {
    const userFormValue = this.formGroupForUser.value;
    const url = `${this.API}/${userFormValue.id}`;

    this.http.put(url, userFormValue).subscribe({
      next: () => alert('User updated successfully!'),
      error: (e) => console.error(e),
      complete: () => {
        this.formGroupForUser = new FormGroup({
          id: new FormControl(0),
          title: new FormControl(''),
          body: new FormControl(''),
        });
        console.log('User Updated');
      },
    });
  }

  deleteFn(id: any) {
    const url = `${this.API}/${id}`;
    const isDelete = confirm('Are you sure you want to delete?');

    if (isDelete) {
      this.http.delete(url).subscribe({
        next: () => alert('User is deleted'),
        error: (e) => console.error(e),
        complete: () => console.warn('User is deleted'),
      });
    }
  }
}
