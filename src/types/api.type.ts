export type TApiError = {
  message: string | string[];
  error: string;
  errorCode?: number;
  code?: number;
};

export type TOnApiError = (onError: TApiError) => void;
