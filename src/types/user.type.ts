import { Dayjs } from "dayjs";

export type TGetUserProfileResponse = {
  data: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TUserProfile = {
  id?: string;
  email?: string;
  username?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
};

export type TPutUserProfileRequest = {
  username?: string;
};

export type TPutChangeUserPasswordRequest = {
  oldPassword: string;
  password: string;
};
