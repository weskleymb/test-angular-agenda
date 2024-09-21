import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faTrash, faMobileAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  imports: [NgFor, FontAwesomeModule],
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<number>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faTrash, faMobileAlt, faPhone);
  }

  onEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  onDeleteContact(id: number) {
    this.deleteContact.emit(id);
  }

  formatPhoneNumber(phone: { type: string; number: string }): string {
    const rawNumber = phone.number.replace(/\D/g, '');
    if (phone.type === 'móvel') {
      return rawNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return rawNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }
}
