import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {URL} from '../../environments/environment';
import {Http, RequestOptions, Headers} from '@angular/http';
import {ChatStateService} from '../service/chat.state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('messageInput') messageInput;
  @ViewChild('scrollMessage') scrollMessage;

  private KEY = 13;

  constructor(private  http: Http,
              public chatService: ChatStateService) {
  }

  /**
   * Send message to users
   * @param message
   */
  public sendMessage(message: string) {
    if (this.chatService.currentChatId === 0 || !message) {
      return;
    }
    const messageDto = {
      senderId: this.chatService.owner.id,
      chatId: this.chatService.currentChatId,
      text: message,
      timeStamp: Date.now(),
      recipientId: this.chatService.currentChatPerson.id
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;');
    const options = new RequestOptions({headers: headers});
    this.http.post(URL.save_message, messageDto, options)
      .subscribe(
        data => {
          this.chatService.messages.push(data.json());
        },
        error => {
          console.log(error);
        }
      );
    this.messageInput.nativeElement.value = '';
  }

  /**
   * Send message by ENTER
   * @param event
   */
  public handleKeyEvents(event: KeyboardEvent) {
    if (event.keyCode === this.KEY) {
      event.preventDefault();
      const message = this.messageInput.nativeElement.value;
      this.sendMessage(message);
    }
  }

  /**
   * Keep scroll down :)
   */
  private scrollToBottom(): void {
    this.scrollMessage.nativeElement.scrollTop = this.scrollMessage.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
