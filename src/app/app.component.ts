import {AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import {ChatStateService} from './service/chat.state.service';
import {User} from './service/interfaces';
import {URL} from '../environments/environment';
import {Http, RequestOptions, Headers} from '@angular/http';
import {WebSocketsService} from './service/websockets.service';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Registration and main component for init user in chat
 */
export class AppComponent implements AfterViewInit {

  public auth2: any;
  public showLogin = true;
  @ViewChild('googleAuthButton') messageInput: ElementRef;

  constructor(public chatService: ChatStateService,
              private http: Http,
              private zone: NgZone,
              private ws: WebSocketsService) {
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  /**
   * Init google auth
   */
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '527848331110-7t76irkqvprs15t4gm6vrujnisaqneoj.apps.googleusercontent.com',
        cookiepolicy: 'http://localhost:4200',
        scope: 'email'
      });
      if (this.messageInput) {
        this.attachSignin(this.messageInput.nativeElement);
      }
    });
  }

  /**
   * Registration after click
   * @param element
   */
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const userDto = {
          id: 0,
          name: profile.getName(),
          email: profile.getEmail(),
          imagePath: profile.getImageUrl(),
          active: true
        };
        this.registrationUser(userDto);
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * Logout users after leaving page
   */
  @HostListener('window:beforeunload')
  private logout() {
    this.chatService.owner.active = false;
    this.ws.send('/app/notify', this.chatService.owner);
    const url = URL.logout + this.chatService.owner.id;
    this.http.get(url)
      .subscribe(data => {
      })
  }

  /**
   * Registration user in chat
   * @param user
   */
  private registrationUser(user: User): any {
    const that = this;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;');
    const options = new RequestOptions({headers: headers});
    this.http.post(URL.login, user, options)
      .subscribe(
        data => {
          that.chatService.owner = data.json();
          const it = this;
          it.zone.run(() => {
            that.ws.connect(function () {
              it.chatService.initActiveUsers();
              it.showLogin = false;
              it.ws.send('/app/notify', it.chatService.owner);
            });
          });
        },
        error => {
          console.log(error);
        }
      );
  }
}
