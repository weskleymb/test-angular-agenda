import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faCheck, faTimes, faMobileAlt, faPhone, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  imports: [FormsModule, NgFor, NgIf, FontAwesomeModule, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class ContactFormComponent {
  @Input() contact: Contact = { id: 0, name: '', email: '', phones: [{ type: 'móvel', number: '' }] };
  @Output() saveContact = new EventEmitter<Contact>();
  @Output() addPhone = new EventEmitter<void>();
  @Output() removePhone = new EventEmitter<number>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus, faCheck, faTimes, faMobileAlt, faPhone, faUser, faEnvelope);
  }

  onSubmit() {
    this.saveContact.emit(this.contact);
  }

  onAddPhone() {
    this.addPhone.emit();
  }

  onRemovePhone(index: number) {
    this.removePhone.emit(index);
  }
}
