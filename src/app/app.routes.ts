import { Routes } from '@angular/router';
import { ReactiveForm } from './components/reactive-form/reactive-form';
import { Usetable } from './components/usetable/usetable';

export const routes: Routes = [
  { path: '', component: ReactiveForm },
  { path: 'use-table', component: Usetable },
];
