import { State } from "../enums/state.enum";

export interface Webcomic {
  id: number;
  authors: number[];
  name: string;
  state: State;
  picture: string; // Technically a byte array, but shhh
  url: string;
}
