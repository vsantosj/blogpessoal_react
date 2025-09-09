import type Posts from "./Posts";

export default interface User {
  id: number;
  name: string;
  user: string;
  password: string;
  photoUrl: string;
  post?: Posts[] | null;
}
