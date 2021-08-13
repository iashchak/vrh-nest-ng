import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailureComponent } from './failure/failure.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'failure',
    component: FailureComponent,
  },
  {
    path: 'success/:jwt',
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
