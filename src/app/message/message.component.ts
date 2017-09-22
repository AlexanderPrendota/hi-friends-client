import {Component, Input} from '@angular/core';
import {Message} from '../service/interfaces';
import {ChatStateService} from '../service/chat.state.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message: Message;

  constructor(public chatService: ChatStateService) {
  }
}
