const HOST = 'localhost';
const PORT = 4141;
const FULL_HOST = HOST + ':' + PORT;

export const URL = {
  active:          'http://' + FULL_HOST + '/api/user/active/',
  save_message:    'http://' + FULL_HOST + '/api/message/save',
  chatId:          'http://' + FULL_HOST + '/api/message/chat/owner/',
  messages:        'http://' + FULL_HOST + '/api/message/messages/',
  login:           'http://' + FULL_HOST + '/login',
  logout:          'http://' + FULL_HOST + '/logout/',
  endPointSockets: 'http://' + FULL_HOST + '/chat',
  notify:          'http://' + FULL_HOST + '/app/notify',
  message:         'http://' + FULL_HOST + '/api/message/id/'
};

export const environment = {
  production: false
};
