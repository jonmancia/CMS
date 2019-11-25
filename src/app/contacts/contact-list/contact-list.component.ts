import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";

@Component({
  selector: "cms-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = "";
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactsChanged.subscribe(
      contacts => (this.contacts = contacts)
    );
  }
  onKeyPress(value: string) {
    this.searchTerm = value;
    console.log(this.searchTerm);
  }
}
