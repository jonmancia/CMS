import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contact.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactSelected = new Subject<Contact>();
  contactsChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxId: number;

  constructor(private http: HttpClient) {
    this.fetchContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.contactsChanged.next(this.contacts);
      this.maxId = this.getMaxId();
    });
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

  fetchContacts() {
    return this.http.get("https://testing-71d9d.firebaseio.com/contacts.json");
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
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
    let parsedContacts = JSON.stringify(this.contacts);
    this.http
      .put("https://testing-71d9d.firebaseio.com/contacts.json", parsedContacts)
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
        console.log(data);
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
    let parsedContacts = JSON.stringify(this.contacts);
    this.http
      .put("https://testing-71d9d.firebaseio.com/contacts.json", parsedContacts)
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
        console.log(data);
      });
    this.contactsChanged.next(this.getContacts());
  }

  deleteContact(contact: Contact) {
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let parsedContacts = JSON.stringify(this.contacts);
    this.http
      .put("https://testing-71d9d.firebaseio.com/contacts.json", parsedContacts)
      .subscribe(data => {
        this.contactsChanged.next(this.getContacts());
        console.log(data);
      });
    this.contactsChanged.next(this.contacts);
  }
}
