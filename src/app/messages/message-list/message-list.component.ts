import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MOCKMESSAGES } from '../MOCKMESSAGES';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  constructor() { }

  ngOnInit() {
    MOCKMESSAGES.forEach((message) => {
      this.messages.push(message);
    })
  }

  addMessage(message: Message) {
    this.messages.push(message)
  }

}
