import { Dayjs } from "dayjs";
import { TUserProfile } from "./user.type";

export type TPost = {
  id: string;
  content: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  user: TUserProfile;
};

export type TGetPostRequest = {
  latestLoadID?: string;
  orderBy: "DESC" | "ASC";
  quantity: number;
};

export type TGetPostResponse = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
};

export type TPostPostRequest = {
  content: string;
};

export type TPostPostResponse = {
  data: {
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    user: {
      username: string;
    };
  };
};
