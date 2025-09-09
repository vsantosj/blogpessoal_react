import type Posts from "./Posts";

export default interface Theme {
  id: number;
  contentTheme: string;
  posts?: Posts[] | null;
}
