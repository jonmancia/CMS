import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    { messageId: 1, subject: 'Hello', msgText: 'Can I ask you a question?', sender: 'Jonathan' }
  ]
  constructor() { }

  ngOnInit() {
  }

  addMessage(message: Message) {
    this.messages.push(message)
  }

}
