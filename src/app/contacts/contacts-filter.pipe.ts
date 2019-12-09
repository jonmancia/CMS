import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from "../contacts/contact.model";

@Pipe({
  name: "contactsFilter"
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: any, term: string): any {
    // create array to add new contacts
    let filteredContacts: Contact[] = [];
    // Loop through list of contacts
    if (term.length) {
      for (const contact of contacts) {
        if (contact.name.toLowerCase().includes(term)) {
          filteredContacts.push(contact);
          console.log(term);
        }
      }
    }

    if (filteredContacts.length < 1) {
      return contacts;
    }
    return filteredContacts;
  }
}
