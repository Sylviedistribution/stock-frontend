import { atom } from "recoil";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const currentUserState = atom<User | null>({
  key: "currentUserState",
  default: null,
});

export const authTokenState = atom<string | null>({
  key: "authTokenState",
  default: null,
});
