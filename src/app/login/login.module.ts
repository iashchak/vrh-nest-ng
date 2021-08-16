import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FailureComponent } from './failure/failure.component';
import { LoginRoutingModule } from './login-routing.module';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [SuccessComponent, FailureComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
