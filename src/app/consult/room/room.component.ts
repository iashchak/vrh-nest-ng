import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  readonly users$ = this.chatService.getUsers();
  readonly messages$ = this.chatService.receiveChat();

  constructor(private readonly chatService: ChatService) {}

  isMyMessage(message: any): Observable<boolean> {
    return of(false);
  }
}
