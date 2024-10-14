import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    NgFor,
    NgIf
  ]
})
export class ContactFormComponent {
  @Input() contact: Contact = { id: 0, name: '', email: '', phones: [{ type: 'móvel', number: '' }] };
  @Output() saveContact = new EventEmitter<Contact>();
  @Output() addPhone = new EventEmitter<void>();
  @Output() removePhone = new EventEmitter<number>();

  onSubmit() {
    this.contact.name = this.contact.name.toUpperCase();
    this.contact.email = this.contact.email.toLowerCase();
    this.saveContact.emit(this.contact);
  }

  onAddPhone() {
    this.addPhone.emit();
  }

  onRemovePhone(index: number) {
    this.removePhone.emit(index);
  }
}
