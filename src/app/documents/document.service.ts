import { Injectable, EventEmitter, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  @Output() selectedDocument = new EventEmitter<Document>();
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  onSelectDocument(document: Document) {
    this.selectedDocument.emit(document);
  }

}
