import { Component, OnInit, Input } from "@angular/core";
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "cms-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.css"]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactService.contactsChanged.subscribe(() => {
        this.contactService.getContact(params["id"]).then(data => {
          this.contact = data;
        });
      });
      this.contactService.getContact(params["id"]).then(data => {
        this.contact = data;
      });
    });
  }
  onContactDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(["/contacts"]);
  }
}
