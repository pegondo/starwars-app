import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "../error";
import { Params } from "../../models/parameters";

/** An interface that represents a generic response from the service. */
interface Response<T> {
  data: T;
  count: number;
}

/** Returns whether the given HTTP status code represents an OK response or not. */
const isOkStatus = (status?: number) => {
  if (!status) return false;
  return 200 <= status && status < 300;
};

/**
 * A hook to perform requests against the service. It calls the given path with
 * the given parameters, and returns the results an object with the following
 * fields:
 * - `successResponse`: contains a successful response. If the response contains
 * an error or an error occurred while performing the request, `successResponse`
 * will be `undefined`.
 * - `errorResponse`: contains an error response. If the request was successful
 * or an error occurred while performing the request, `errorResponse` will be
 * `undefined`.
 * - `error`: contains an error that occurred while performing the request. If
 * no errors occurred, `error` will be `undefined`.
 * @param path - The path to request.
 * @param params - The query parameters to use.
 */
const useService = <T>(path: string, params?: Params) => {
  const [successResponse, setSuccessResponse] = useState<Response<T>>();
  const [errorResponse, setErrorResponse] = useState<ErrorResponse>();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get<T | ErrorResponse>(path, {
        params: {
          page: params?.page,
          pageSize: params?.pageSize,
          search: params?.search,
          sortField: params?.sortCriteria?.field,
          sortOrder: params?.sortCriteria?.order,
        },
      })
      .then(({ data, status }) => {
        if (isOkStatus(status)) {
          setSuccessResponse(data as Response<T>);
          return;
        }
        setErrorResponse(data as ErrorResponse);
      })
      .catch(setError);
  }, [
    path,
    params?.page,
    params?.pageSize,
    params?.search,
    params?.sortCriteria?.field,
    params?.sortCriteria?.order,
  ]);

  return { successResponse, errorResponse, error };
};

export default useService;
