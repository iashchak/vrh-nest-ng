import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultRoutingModule } from './consult-routing.module';
import { ConsultComponent } from './consult.component';
import { RoomComponent } from './room/room.component';

@NgModule({
  declarations: [ConsultComponent, RoomComponent],
  imports: [CommonModule, ConsultRoutingModule],
})
export class ConsultModule {}
