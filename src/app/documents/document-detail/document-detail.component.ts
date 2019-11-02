import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WinRefService } from '../../win-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;
  nativeWindow: any;
  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WinRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((result) => {
      this.document = this.documentService.getDocument(result.get('id'))
    }
    )
  }

  onView() {
    this.nativeWindow.open(this.document.url);
  }

  onDocumentDelete() {
    // Get the id
    // get the document
    this.documentService.deleteDocument(this.document.id);
    // remove the document from service
    // route to /documents
    this.router.navigate(['/documents']);
  }

}
