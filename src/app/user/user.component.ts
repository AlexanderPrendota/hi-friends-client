import {ApplicationRef, Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {URL} from '../../environments/environment';
import {ChatStateService} from '../service/chat.state.service';
import {User} from '../service/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  @Input() user: User;

  public isNotify = false;

  constructor(private http: Http,
              private chatService: ChatStateService,
              private ref: ApplicationRef) {
  }

  /**
   * Init chat between two users
   */
  public showChat() {
    if (this.chatService.currentChatPerson.id !== this.user.id) {
      this.chatService.currentChatPerson = this.user;
      const url = URL.chatId + this.chatService.owner.id + '/user/' + this.user.id;
      this.http.get(url)
        .subscribe(
          data => {
            this.chatService.currentChatId = data.json();
            this.getUserMessage();
          },
          error => {
            console.log(error);
          }
        )
    }
  }

  /**
   * Get messages between two users
   */
  public getUserMessage() {
    const url = URL.messages + this.chatService.owner.id + '/' + this.user.id;
    this.http.get(url)
      .subscribe(
        data => {
          this.chatService.messages = data.json();
          this.ref.tick();
        },
        error => {
          console.log(error);
        }
      )
  }
}
