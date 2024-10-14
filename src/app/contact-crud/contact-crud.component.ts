import { Component } from '@angular/core';
import { ContactService } from '../contact-service.service';
import { Contact } from '../contact.model';
import { ContactFormComponent } from './contact-form.component';
import { ContactListComponent } from './contact-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact-crud',
  standalone: true,
  templateUrl: './contact-crud.component.html',
  imports: [
    MatGridListModule,
    MatCardModule,
    ContactFormComponent,
    ContactListComponent
  ]
})
export class ContactCrudComponent {
  contacts: Contact[];
  editingContact: Contact | null = null;
  newContact: Contact = { id: 0, name: '', email: '', phones: [{ type: 'móvel', number: '' }] };

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  saveContact(contact: Contact) {
    contact.name = contact.name.toUpperCase();
    contact.email = contact.email.toLowerCase();

    if (this.editingContact) {
      this.contactService.updateContact(contact);
      this.editingContact = null;
    } else {
      this.contactService.addContact(contact);
    }
    this.resetForm();
  }

  editContact(contact: Contact) {
    this.editingContact = { ...contact, phones: contact.phones.map(phone => ({ ...phone })) };
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getContacts();
  }

  addPhone() {
    if (this.editingContact) {
      this.editingContact.phones.push({ type: 'móvel', number: '' });
    } else {
      this.newContact.phones.push({ type: 'móvel', number: '' });
    }
  }

  removePhone(index: number) {
    if (this.editingContact) {
      this.editingContact.phones.splice(index, 1);
    } else {
      this.newContact.phones.splice(index, 1);
    }
  }

  resetForm() {
    this.newContact = { id: 0, name: '', email: '', phones: [{ type: 'móvel', number: '' }] };
    this.editingContact = null;
  }
}
