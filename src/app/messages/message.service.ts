import { Injectable, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class MessageService {
  addedMessage = new Subject<Message>();
  messagesChanged = new Subject<Message[]>();
  messages: Message[] = [];
  maxId: number;

  constructor(private http: HttpClient) {
    this.fetchMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messagesChanged.next(this.messages);
      this.maxId = this.getMaxId();
    });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.getMessages()) {
      if (parseInt(message.id) > maxId) {
        maxId = parseInt(message.id);
      }
    }
    return maxId;
  }

  fetchMessages() {
    return this.http
      .get("https://testing-71d9d.firebaseio.com/messages.json")
      .pipe(
        map(responseData => {
          const messagesArray: Message[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messagesArray.push({ ...responseData[key], id: key });
            }
          }
          return messagesArray;
        })
      );
  }

  getMessages() {
    if (this.messages) {
      return this.messages.slice();
    }
  }

  getMessage(id: string) {
    return this.messages.filter(message => message.id == id);
  }

  insertMessage(message: Message) {
    message.id = (this.maxId + 1).toString();
    this.messages.push(message);
    let parsedMessages = JSON.stringify(this.messages);
    this.http
      .put("https://testing-71d9d.firebaseio.com/messages.json", parsedMessages)
      .subscribe((messages: Message[]) => {
        this.messagesChanged.next(this.getMessages());
        console.log(messages);
      });
  }
}
