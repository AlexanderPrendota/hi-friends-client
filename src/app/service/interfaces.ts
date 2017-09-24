export interface Message {
  text: string,
  senderName: string,
  senderImagePath: string,
  senderId: number,
  timeStamp: string
}

export interface User {
  id: number,
  name: string,
  email: string,
  imagePath: string
  active: boolean
}
