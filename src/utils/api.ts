import { TApiError } from "@/types/api.type";
import { AxiosError, AxiosResponse } from "axios";

/**
 * Handles general API requests, managing success, error, and loading states.
 * @param request - The API request promise (e.g., an Axios request).
 * @param setIsFetching - A function to set the loading state for the request.
 * @returns An object containing either the result or an error.
 */
export const handleApiRequest = async <R = AxiosResponse>(
  request: Promise<R>, // The promise for the API call
  setIsFetching?: (loading: boolean) => void, // Function to toggle fetching state
): Promise<{ result: R | null; error: TApiError | unknown | null }> => {
  try {
    setIsFetching?.(true); // Set loading state to true before making the request

    const result = await request; // Wait for the API call to complete
    return { result, error: null }; // Return the result, with no error
  } catch (err) {
    let error: TApiError | unknown = null;

    // Check if the error is an AxiosError and has a response (specific to Axios)
    if (err instanceof AxiosError && err.response?.data) {
      error = err.response.data as TApiError; // Extract the error data from the response
    } else {
      error = err; // If it's not an Axios error, store the error as it is
    }

    return { result: null, error }; // Return null for result and pass the error
  } finally {
    setIsFetching?.(false);
  }
};
