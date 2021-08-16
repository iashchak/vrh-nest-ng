import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [NoopAnimationsModule, AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
