import {ApplicationRef, Injectable} from '@angular/core';
import {Message, User} from './interfaces';
import {URL} from '../../environments/environment';
import {Http} from '@angular/http';
/**
 * Service for main information about current user and his chats
 */
@Injectable()
export class ChatStateService {

  currentChatId = 0;
  messages: Message[] = [];
  activeUsers: User[] = [];
  currentChatPerson: User = {
    id: 0,
    name: '',
    email: '',
    imagePath: '',
    active: false
  };
  owner: User = {
    id: -1,
    name: '',
    email: '',
    imagePath: '',
    active: false
  };

  constructor(private http: Http) {
  }

  /**
   * Init active users for chat.
   */
  public initActiveUsers() {
    const url = URL.active + this.owner.id;
    this.http.get(url)
      .subscribe(
        data => {
          this.activeUsers = data.json();
        },
        error => {
          console.log(error);
        }
      )
  }

  /**
   * Update message in chat or notify
   * @param messageId
   */
  public updateMessage(messageId) {
    const url = URL.message + messageId;
    this.http.get(url)
      .subscribe(
        data => {
          const message = data.json();
          if (message.senderId === this.currentChatPerson.id) {
            this.messages.push(message);
          } else {
            console.log('To notify');
          }
        },
        error => {
          console.log(error);
        }
      )
  }
}
