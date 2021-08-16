import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
// Modules
import { RoomsModule } from '../rooms/rooms.module';
// Components
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AuthModule, RoomsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
