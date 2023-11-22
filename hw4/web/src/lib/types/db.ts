export type User = {
  id: string;
  username: string;
};

export type Friendship = {
  chatroomId: number;
  name1: string;
  name2: string;
};

export type Message = {
  id: number;
  chatroomId: number;
  authorName: string;
  friendName: string;
  content: string;
  createdAt: Date | null;
  state: string | null;
};
