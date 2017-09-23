import {Component, Input, OnDestroy } from '@angular/core';
import {Http} from '@angular/http';
import {URL} from '../../environments/environment';
import {ChatStateService} from '../service/chat.state.service';
import {User} from '../service/interfaces';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnDestroy {

  @Input() user: User;

  public isNotify = false;
  private subscription: ISubscription;

  constructor(private http: Http,
              private chatService: ChatStateService) {
    this.subscription = chatService.notifyValueChange.subscribe((userId) => {
      this.isNotify = userId === this.user.id;
    })
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
            this.isNotify = false;
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
        },
        error => {
          console.log(error);
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
