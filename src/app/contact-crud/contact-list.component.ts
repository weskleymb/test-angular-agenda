import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  imports: [MatIconModule, MatListModule, MatButtonModule, NgFor]
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<number>();

  formatPhoneNumber(phone: { type: string; number: string }): string {
    const rawNumber = phone.number.replace(/\D/g, '');
    return phone.type === 'móvel'
      ? rawNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      : rawNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  onEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  onDeleteContact(id: number) {
    this.deleteContact.emit(id);
  }
}
