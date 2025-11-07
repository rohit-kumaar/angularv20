import { Component, signal } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {
  userName = signal<string>('Rohit Kumar');
  count = 0;

  onCounterChange(newCount: number) {
    this.count = newCount;
  }
}
