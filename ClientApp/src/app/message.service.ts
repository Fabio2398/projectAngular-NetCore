import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  //AGGIUNGE UN MESSAGGIO ALLA CACHE
  add(message: string) {
    this.messages.push(message);
  }

  //PULISCE LA CACHE
  clear() {
    this.messages = [];
  }
}
