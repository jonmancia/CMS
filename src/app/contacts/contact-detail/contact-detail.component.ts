import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    // Subscribe to any changes to id in route and assign contact to local contact
    this.route.paramMap.subscribe((params) => this.contact = this.contactService.getContact(params.get('id')))
  }

  onContactDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
