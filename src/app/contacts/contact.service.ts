import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelected = new Subject<Contact>();
  contactsChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id);
      }
    }
    return maxId;
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    contact.id = (this.maxId + 1).toString();
    this.contacts.push(contact);
    this.contactsChanged.next(this.getContacts());
  }

  updateContact(ogContact: Contact, newContact: Contact) {
    if (!ogContact || !newContact) {
      return;
    }
    newContact.id = ogContact.id;

    let ogContactPos = this.contacts.indexOf(ogContact);

    if (ogContactPos < 0) {
      return;
    }

    this.contacts[ogContactPos] = newContact;

    this.contactsChanged.next(this.getContacts());

  }

  deleteContact(contact: Contact) {
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactsChanged.next(this.contacts);
  }
}
