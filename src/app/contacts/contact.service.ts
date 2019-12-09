import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelected = new Subject<Contact>();
  contactsChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxId: number;

  constructor(private http: HttpClient, route: ActivatedRoute) {
    this.fetchContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.contactsChanged.next(this.contacts);
      this.maxId = this.getMaxId();
    });
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id);
      }
    }
    return maxId;
  }

  fetchContacts() {
    return this.http.get('http://localhost:3000/api/contacts');
  }

  async getContact(id: string): Promise<any> {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
  }

  getContacts(): any {
    return this.contacts.slice();
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    contact.id = (this.maxId + 1).toString();
    this.contacts.push(contact);
    let parsedContact = JSON.stringify(this.contacts[this.contacts.length - 1]);
    this.http
      .post('http://localhost:3000/api/contacts', parsedContact, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
      });
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
    let parsedContact = JSON.stringify(this.contacts[ogContactPos]);
    console.log(parsedContact);
    this.http
      .put(
        `http://localhost:3000/api/contacts/${newContact.id}`,
        parsedContact,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
      });
    this.contactsChanged.next(this.getContacts());
  }

  deleteContact(contact: Contact) {
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    const url = `http://localhost:3000/api/contacts/${contact.id}`;
    this.contacts.splice(pos, 1);
    this.http
      .delete(url, {
        responseType: 'json',
      })
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
      });
    this.contactsChanged.next(this.contacts);
  }
}
