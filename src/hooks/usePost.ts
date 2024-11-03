import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { TGetPostRequest, TGetPostResponse, TPost } from "@/types/post.type";
import { handleApiRequest } from "@/utils/api";
import { convertDateInDatas } from "@/utils/date";
import { getUserAccessToken } from "@/utils/user";
import axios from "axios";
import { toast } from "react-toastify";

type TGetPostParams = {
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<TPost[]>>;
  latestLoadID: string | undefined;
  setLatestLoadID: React.Dispatch<React.SetStateAction<string | undefined>>;
  controller?: AbortController;
};

type TGetPost = (params: TGetPostParams) => Promise<void>;

type TGetPostWhenBottom = (
  scrollPercentage: number,
  getPostParams: TGetPostParams,
) => void;

export const useGetPost = () => {
  const getPost: TGetPost = async ({
    isFetching,
    setIsFetching,
    setPosts,
    latestLoadID,
    setLatestLoadID,
    controller,
  }) => {
    if (isFetching) return;
    setIsFetching(true);

    const payload: TGetPostRequest = {
      orderBy: "DESC",
      quantity: latestLoadID ? 5 : 10,
    };

    if (latestLoadID) payload.latestLoadID = latestLoadID;

    const { result, error } = await handleApiRequest(
      api.get(pathJustPostV1.post.getPosts, {
        params: payload,
        headers: { Authorization: getUserAccessToken() },
        signal: controller?.signal,
      }),
      setIsFetching,
    );

    if (axios.isCancel(error)) return;
    if (error) {
      toast.error("Something went wrong");
      console.log(error);
      return;
    }

    const datas: TGetPostResponse[] = result?.data?.data;

    if (datas?.length > 0) {
      const formattedData = convertDateInDatas<TGetPostResponse, TPost>(datas, [
        "createdAt",
        "updatedAt",
      ]);
      setPosts((prevPosts) => prevPosts.concat(formattedData));
      setLatestLoadID(datas[datas.length - 1].id);
    }

    setIsFetching(false);
  };

  const getPostWhenBottom: TGetPostWhenBottom = (
    scrollPercentage,
    { isFetching, setIsFetching, setPosts, latestLoadID, setLatestLoadID },
  ) => {
    if (scrollPercentage > 90 && !isFetching) {
      const params: TGetPostParams = {
        isFetching,
        setIsFetching,
        setPosts,
        latestLoadID,
        setLatestLoadID,
      };
      getPost(params);
    }
  };

  return { getPost, getPostWhenBottom };
};
