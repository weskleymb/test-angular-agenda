import { Routes } from '@angular/router';
import { ContactCrudComponent } from './contact-crud/contact-crud.component';

export const routes: Routes = [
  { path: '', component: ContactCrudComponent }, // Home é o CRUD de contatos
];
