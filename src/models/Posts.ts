import type Theme from "./Theme";
import type User from "./User";

export default interface Posts {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  theme: Theme | null;
  user: User | null;
}
