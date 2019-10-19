import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  addedMessage = new EventEmitter<Message>();
  messages: Message[];
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    return this.messages.filter((message) => message.id == id);

  }

  insertMessage(message: Message) {
    this.messages.push(message);
    this.addedMessage.emit(message);
  }
}
