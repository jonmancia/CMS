import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  formValid: boolean;
  originalDocument: Document = null;
  newDocument: Document = null;
  documentId: string = null;
  documentForm = {
    id: '',
    title: '',
    description: '',
    url: '',
  };

  constructor(
    private documentService: DocumentService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params.id) {
        // we'll get the document based on the id
        this.originalDocument = this.documentService.getDocument(params.id);
        // we'll bind to DOM
        this.documentForm.title = this.originalDocument.name;
        this.documentForm.description = this.originalDocument.description;
        this.documentForm.url = this.originalDocument.url;
      }
    });
    // this.documentService.documentsChanged();
  }

  onSubmit() {
    this.formValid = this.form.valid;
    if (this.formValid) {
      this.newDocument = new Document();
      this.newDocument.name = this.documentForm.title;
      this.newDocument.description = this.documentForm.description;
      this.newDocument.url = this.documentForm.url;
      // is there an original document? if so update it and return
      if (this.originalDocument) {
        this.documentService.updateDocument(
          this.originalDocument,
          this.newDocument
        );
        this.router.navigate(['/documents']);
        return;
      }
      this.documentService.addDocument(this.newDocument);
      this.router.navigate(['/documents']);
    }
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/documents']);
  }
}
