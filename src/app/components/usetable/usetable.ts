import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../shared/table/table';

@Component({
  selector: 'app-usetable',
  imports: [Table, AsyncPipe],
  templateUrl: './usetable.html',
  styleUrl: './usetable.scss',
})
export class Usetable {
  API = 'https://jsonplaceholder.typicode.com/posts';
  http = inject(HttpClient);
  posts$: Observable<any[]>;

  constructor() {
    this.posts$ = this.http.get<any[]>(this.API);
  }

  // Define columns dynamically
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Body' },
  ];
}
