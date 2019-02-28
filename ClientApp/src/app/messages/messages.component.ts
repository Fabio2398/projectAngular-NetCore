import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
 
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { } //il parametro sarà public, 
                                                        //perchè deve essere collegato al template del HTML

  ngOnInit() {
  }

}
