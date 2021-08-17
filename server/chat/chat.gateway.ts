import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { of } from 'node_modules/rxjs';
import { Server, Socket } from 'socket.io';
import { JwtService } from '../auth/jwt.service';
import { MessageService } from '../rooms/message.service';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../users/entities/user.entity';
type Client = any;

@WebSocketGateway({ path: '/api/consult' })
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
