import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ChatStateService} from './service/chat.state.service';
import {AutosizeModule} from 'angular2-autosize';
import {WebSocketsService} from './service/websockets.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AutosizeModule
  ],
  providers: [ChatStateService, WebSocketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
