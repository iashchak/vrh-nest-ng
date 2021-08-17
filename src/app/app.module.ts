import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { EntitiesModule } from './entities/entities.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngrx-data-pagination';

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
    HttpClientModule,

    PaginationModule.forRoot(),
    EntitiesModule,
    SocketIoModule.forRoot(config),
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
