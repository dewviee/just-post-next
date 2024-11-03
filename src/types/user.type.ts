import { Dayjs } from "dayjs";

export type TGetUserProfileResponse = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type TUserProfile = {
  id?: string;
  email?: string;
  username?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
};
