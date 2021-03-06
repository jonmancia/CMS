import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.selectedDocuments.subscribe((documents: Document[]) => this.documents = documents)
  }

  selectedDocument(document: Document) {
    this.documentService.onSelectDocument(document);
  }

  addDocument(document: Document) {
    this.documentService.addDocument(document);
  }
}
