import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss'],
})
export class ConsultComponent {
  readonly users$ = this.chatService.getUsers();
  readonly messages$ = this.chatService.receiveChat();

  constructor(private readonly chatService: ChatService) {}
}
