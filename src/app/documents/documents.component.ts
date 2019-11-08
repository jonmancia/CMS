import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.selectedDocument.subscribe(
      document => this.selectedDocument = document
    )
  }

}
