import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

const config: SocketIoConfig = {
  url: 'ws://localhost:4200',
  options: { path: '/api/consult', autoConnect: true },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ComponentsModule,
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
