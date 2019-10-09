import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Output() messageAdded = new EventEmitter<Message>();
  @ViewChild('subjectInput', { static: true }) subjectInput: ElementRef;
  @ViewChild('messageInput', { static: true }) messageInput: ElementRef;
  currentSender = 'Jonathan';
  currentId = 2;
  constructor() { }

  ngOnInit() {
  }

  onMessageSubmit() {
    const subject = this.subjectInput.nativeElement.value;
    const message = this.messageInput.nativeElement.value;
    const newMessage = new Message(this.currentId, subject, message, this.currentSender)
    this.messageAdded.emit(newMessage);
  }
  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }
}
