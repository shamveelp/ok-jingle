import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager.js";

export interface User {
  socket: Socket;
  name: string;
}

let GLOBAL_ROOM_ID = 1;

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;
  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager()
  }
  addUser(name: string, socket: Socket) {
    this.users.push({
      name,
      socket,
    });
    this.queue.push(socket.id);
    this.clearQueue();
    this.initHandlers(socket)
  }

  removeUser(socketId: string) {
    this.users = this.users.filter(
        (user) => user.socket.id === socketId
    );
    this.queue = this.queue.filter(
        (id) => id === socketId
    )
  }

  clearQueue() {
    if (this.queue.length < 2) {
      return;
    }
    const user1 = this.users.find(
      (user) => user.socket.id === this.queue.pop()
    );
    const user2 = this.users.find(
        (user) => user.socket.id === this.queue.pop()
    );

    if(!user1 || !user2) {
        return;
    }

    const room = this.roomManager.createRoom(user1, user2);
    this.clearQueue();
  }

  initHandlers(socket: Socket) {
    socket.on("offer", (data: {roomId: string, sdp: string}) => {
        this.roomManager.onOffer(data.roomId, data.sdp);
    });
    socket.on("answer", (data: {roomId: string, sdp: string}) => {
        this.roomManager.onAnswer(data.roomId, data.sdp);
    });
  }
}
