import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  @Output() selectedDocument = new EventEmitter<Document>();
  constructor() { }

  ngOnInit() {
    MOCKDOCUMENTS.forEach((document) => {
      this.documents.push(document);
    })
  }

  selectDocument(document: Document) {
    this.selectedDocument.emit(document);
  }
}
