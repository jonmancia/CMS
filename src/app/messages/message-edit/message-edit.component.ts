import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', { static: true }) subjectInput: ElementRef;
  @ViewChild('messageInput', { static: true }) messageInput: ElementRef;
  currentId = '6';
  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onMessageSubmit() {
    const currentSender = `${Math.ceil(Math.random() * 3)}`;
    const subject = this.subjectInput.nativeElement.value;
    const message = this.messageInput.nativeElement.value;
    const newMessage = new Message(
      this.currentId,
      subject,
      message,
      currentSender
    );
    this.messageService.insertMessage(newMessage);
  }
  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }
}
