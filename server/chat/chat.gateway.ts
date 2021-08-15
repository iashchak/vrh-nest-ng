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
type Client = any;

@WebSocketGateway({ namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  connectedUsers: string[] = [];

  constructor(
    private jwtService: JwtService,
    private roomService: RoomsService
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
  async onMessage(client: Client, data: any) {
    const event: string = 'message';
    const result = data[0];

    await this.roomService.addMessage(result.message, result.room);
    client.broadcast.to(result.room).emit(event, result.message);

    return of({ event, data: result.message });
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Client, data: any): Promise<any> {
    client.join(data[0]);

    const messages = await this.roomService.findMessages(data, 25);

    // Send last messages to the connected user
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client: Client, data: any): void {
    client.leave(data[0]);
  }
}
