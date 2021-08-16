import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from './consult.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultComponent,
    children: [
      {
        path: ':roomId',
        component: RoomComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultRoutingModule {}
