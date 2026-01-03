import type { User } from "./Usermanager.js";

let GLOBAL_ROOM_ID = 1;

interface Room {
  user1: User;
  user2: User;
  // roomId: number;
}

export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generate();
    this.rooms.set(roomId.toString(), {
      user1: user1,
      user2: user2,
      // roomId: roomId
    });

    user1.socket.emit("new-room", {
      type: "send-offer",
      roomId,
    });
  }

  onOffer(roomId: string, sdp: string) {
    const user2 = this.rooms.get(roomId)?.user2;
    user2?.socket.emit("offer",{
        sdp
    })
  }

  onAnswer(roomId: string, sdp: string) {
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("answer",{
        sdp
    })
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
