import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../message.model";
import { ContactService } from "src/app/contacts/contact.service";
import { Contact } from "src/app/contacts/contact.model";

@Component({
  selector: "cms-message-item",
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "Unknown";
  contact: Contact;
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.fetchContacts().subscribe(contacts => {
      this.contact = this.contactService.getContact(this.message.sender);
      if (this.contact) {
        this.messageSender = this.contact.name;
      }
    });
    //this.contact = this.contactService.getContact(this.message.sender);
  }
}
