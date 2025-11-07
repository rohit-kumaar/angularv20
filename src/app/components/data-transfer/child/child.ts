import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  userName = input<string>();
  countChange = output<number>();
  count = 0;

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
