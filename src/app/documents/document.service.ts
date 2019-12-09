import { Injectable, EventEmitter, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  maxId: number;
  selectedDocument = new Subject<Document>();
  selectedDocuments = new Subject<Document[]>();
  url = 'http://localhost:3000/api/documents';
  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe((documents: Document[]) => {
      this.documents = documents;
      this.selectedDocuments.next(this.documents);
      this.maxId = this.getMaxId();
    });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      if (parseInt(document.id) > maxId) {
        maxId = parseInt(document.id);
      }
    }
    return maxId;
  }

  getDocuments() {
    return this.documents.slice();
  }

  onSelectDocument(document: Document) {
    this.selectedDocument.next(document);
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
  }

  deleteDocument(id: string) {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        this.documents.splice(i, 1);
        let parsedDocuments = JSON.stringify(this.documents);
        this.http
          .delete(`${this.url}/${id}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          })
          .subscribe((data: Document[]) => {
            this.documents = data;
            this.selectedDocuments.next(this.documents);
            console.log(data);
          });
        break;
      }
    }
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    document.id = (this.maxId + 1).toString();
    this.documents.push(document);
    const parsedDocument = JSON.stringify(document);
    this.http
      .post(this.url, parsedDocument, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe(data => {
        this.selectedDocuments.next(this.documents);
      });
    this.selectedDocuments.next(this.getDocuments());
  }

  updateDocument(ogDocument: Document, newDocument: Document) {
    if (!ogDocument || !newDocument) {
      return;
    }
    const existingDocPosition = this.documents.indexOf(ogDocument);

    if (existingDocPosition < 0) {
      return;
    }

    newDocument.id = ogDocument.id;
    this.documents[existingDocPosition] = newDocument;
    const parsedDocument = JSON.stringify(newDocument);
    this.http
      .put(`${this.url}/${newDocument.id}`, parsedDocument, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe((data: Document[]) => {
        this.documents = data;
        this.selectedDocuments.next(this.documents);
      });
    this.selectedDocuments.next(this.getDocuments());
  }
}
