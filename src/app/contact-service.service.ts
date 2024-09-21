import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { CONTACTS } from '../assets/database'; // Importando o arquivo database.ts

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts = CONTACTS;

  getContacts(): Contact[] {
    // Ordena os contatos em ordem crescente de nome
    return this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  addContact(contact: Contact): void {
    contact.id = this.contacts.length + 1; // Simula a criação de um ID único
    this.contacts.push(contact);
    // Ordena os contatos após adicionar um novo
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
    }
    // Ordena os contatos após a atualização
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    // Ordena os contatos após a remoção
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }
}
