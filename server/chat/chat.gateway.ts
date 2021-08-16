import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { of } from 'rxjs';
import { RoomsService } from '../rooms/rooms.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'server/auth/jwt.service';
import { User } from 'server/users/entities/user.entity';
import { MessageService } from 'server/rooms/message.service';
type Client = any;

@WebSocketGateway({ namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  connectedUsers: string[] = [];

  constructor(
    private jwtService: JwtService,
    private roomService: RoomsService,
    private messageService: MessageService
  ) {}

  async handleConnection(socket: Socket) {
    const user: User = await this.jwtService.verify(
      `${socket.handshake.query.token}`,
      true
    );

    this.connectedUsers = [...this.connectedUsers, String(user._id)];

    // Send list of connected users
    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket: Socket) {
    const user: User = await this.jwtService.verify(
      `${socket.handshake.query.token}`,
      true
    );
    const userPos = this.connectedUsers.indexOf(String(user._id));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1),
      ];
    }

    // Sends the new list of connected users
    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('message')
  async onMessage(client: Client, data: { message: string; room: string }[]) {
    const event: string = 'message';
    const { message, room } = data[0];

    await this.roomService.addMessage(room, message);
    client.broadcast.to(room).emit(event, message);

    return of({ event, data: message });
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Client, data: any): Promise<any> {
    client.join(data[0]);

    const messages = await this.messageService.getByParent(data[0], 25);

    // Send last messages to the connected user
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client: Client, data: any): void {
    client.leave(data[0]);
  }
}
