import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  // Get form from DOM
  @ViewChild('form', { static: true }) form: NgForm;
  originalContact: Contact = null;
  newContact: Contact = null;
  contactGroup: Contact[] = [];
  invalidGroupContact: boolean;
  // Contact
  contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    imageUrl: '',
    group: [],
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.originalContact = this.contactService.getContact(params.id);
      this.contact.id = this.originalContact.id;
      this.contact.name = this.originalContact.name;
      this.contact.email = this.originalContact.email;
      this.contact.phone = this.originalContact.phone;
      this.contact.imageUrl = this.originalContact.imageUrl;

      if (this.originalContact.group != null) {
        this.contact.group = JSON.parse(
          JSON.stringify(this.originalContact.group),
        );
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.newContact = new Contact();
      this.newContact.name = this.contact.name;
      this.newContact.email = this.contact.email;
      this.newContact.phone = this.contact.phone;
      this.newContact.imageUrl = this.contact.imageUrl;
      this.newContact.group = JSON.parse(JSON.stringify(this.contact.group));

      if (this.originalContact) {
        this.contactService.updateContact(
          this.originalContact,
          this.newContact,
        );
        this.router.navigate(['/contacts']);
        return;
      }

      this.contactService.addContact(this.newContact);
      this.router.navigate(['/contacts']);
    }
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.contactGroup.length; i++) {
      if (
        newContact.id === this.contactGroup[i].id ||
        newContact.id === this.contact.group[i].id
      ) {
        console.log(newContact.id, this.contactGroup[i].id);
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.contact.group.push(selectedContact);
    this.contactGroup.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.contactGroup.length) return;
    this.contactGroup.splice(idx, 1);
    this.contact.group.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
