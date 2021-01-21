import { SocialLink } from "./sociallink";

export interface Author {
  id: number;
  name: string;
  webcomics: number[];
  socialLinks?: SocialLink[];
}
