import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';

@NgModule({
  declarations: [SuccessComponent, FailureComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
