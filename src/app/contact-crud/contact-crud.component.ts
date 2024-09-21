import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact-service.service';
import { ContactFormComponent } from './contact-form.component';
import { ContactListComponent } from './contact-list.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-crud',
  standalone: true,
  templateUrl: './contact-crud.component.html',
  imports: [ContactFormComponent, ContactListComponent, NgIf],
})
export class ContactCrudComponent {
  contacts: Contact[];
  editingContact: Contact | null = null;

  newContact: Contact = { id: 0, name: '', email: '', phones: [{ type: 'móvel', number: '' }] };

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  saveContact(contact: Contact) {
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
