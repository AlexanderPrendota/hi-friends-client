import {Injectable} from '@angular/core';
import {Message, User} from './interfaces';
import {URL, AUDIO_URL} from '../../environments/environment';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';

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
  notifyValueChange = new Subject();

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
   * Play audio message after notification
   */
  public alarmNotify() {
    const audio = new Audio();
    audio.src = AUDIO_URL;
    audio.load();
    audio.play();
  }
}
