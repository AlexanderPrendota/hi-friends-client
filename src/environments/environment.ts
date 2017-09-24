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

export const environment = {
  production: false
};
