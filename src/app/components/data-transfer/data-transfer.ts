import { Component } from '@angular/core';
import { Parent } from './parent/parent';
import { Child } from "./child/child";

@Component({
  selector: 'app-data-transfer',
  imports: [Parent, Child],
  templateUrl: './data-transfer.html',
  styleUrl: './data-transfer.scss',
})
export class DataTransfer {}
