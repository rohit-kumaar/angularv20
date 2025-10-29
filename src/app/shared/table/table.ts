import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  /** Define column headers and keys
   * Example: [{ key: 'id', label: 'ID' }, { key: 'title', label: 'Title' }]
   */
  @Input() columns: { key: string; label: string }[] = [];

  /** Array of data objects */
  @Input() data: any[] = [];
}
