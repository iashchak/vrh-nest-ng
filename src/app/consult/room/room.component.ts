import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  readonly users$ = this.chatService.getUsers();
  readonly messages$ = this.chatService.receiveChat();

  constructor(private readonly chatService: ChatService) {}

  ngOnInit(): void {}

  isMyMessage(message: any): Observable<boolean> {
    return of(false);
  }
}
