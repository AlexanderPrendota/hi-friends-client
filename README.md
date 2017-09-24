# Hiclient

Client for Hi-Friends-server from (https://github.com/AlexandrPrendota/HiFriends-server).

![hi-client](https://user-images.githubusercontent.com/10503748/30776013-22777498-a0a7-11e7-806a-63968dca8535.gif)

## How to change configuration.
look at `environment.ts`
```typescript
const HOST = 'localhost';
const PORT = 8080;
const FULL_HOST = HOST + ':' + PORT;

export const URL = {
  active:          'http://' + FULL_HOST + '/api/user/active/',
  save_message:    'http://' + FULL_HOST + '/api/message/save',
  chatId:          'http://' + FULL_HOST + '/api/message/chat/owner/',
  messages:        'http://' + FULL_HOST + '/api/message/messages/',
  login:           'http://' + FULL_HOST + '/login',
  logout:          'http://' + FULL_HOST + '/logout/',
  endPointSockets: 'http://' + FULL_HOST + '/chat'
};

export const AUDIO_URL = 'http://www.pacdv.com/sounds/mechanical_sound_effects/cling_1.wav';
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
