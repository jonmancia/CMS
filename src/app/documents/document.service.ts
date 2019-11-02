import { Injectable, EventEmitter, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  @Output() selectedDocument = new EventEmitter<Document>();
  @Output() selectedDocuments = new EventEmitter<Document[]>();
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  onSelectDocument(document: Document) {
    this.selectedDocument.emit(document);
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
  }

  deleteDocument(id: string) {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id == id) {
        this.documents.splice(i, 1);
        this.selectedDocuments.emit(this.documents)
        break;
      }
    }
  }
}
